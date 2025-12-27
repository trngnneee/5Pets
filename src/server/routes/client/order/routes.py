import json
import os
import uuid
from . import order_bp
from flask import request, jsonify
from model.customer import Customer
from model.order import Order
from model.order_detail import OrderDetail
from model.pet import Pet
from helper.FlaskMail import send_order_email 
from datetime import datetime, timezone
import time
import hmac
import hashlib
import requests
from dotenv import load_dotenv
load_dotenv()

ZALOPAY_CONFIG = {
    "app_id": 2554,
    "key1": "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn",
    "key2": "trMrHtvjo6myautxDUiAcYsVtaeQ8nhf",
    "endpoint": "https://sb-openapi.zalopay.vn/v2/create"
}

@order_bp.route('/create', methods=['POST'])
def create_order():
    data = request.get_json()
    fullname = data.get("fullname")
    phone = data.get("phone")
    email = data.get("email")
    address = data.get("address")
    note = data.get("note")
    payment_method = data.get("payment_method")
    idList = data.get("idList")
    #print(idList)
    
    existCustomer = Customer.objects(email=email).first()
    if not existCustomer:
        newCustomer = Customer(
            fullname=fullname,
            email=email,
        ).save()
        customer_id = newCustomer.id
    else:
        customer_id = existCustomer.id

    order = Order(
        payment_method=payment_method,
        total=0,
        address=address,
        phone=phone,
        note=note,
        customer_id=customer_id,
        updated_by=None
    ).save()

    total = 0
    pet_names = []
    for item in idList:
        pet_id = item.get("id")
        quantity = item.get("quantity", 1)

        
        updated = Pet.objects(
            id=pet_id,
            stock__gte=quantity
        ).update_one(
            inc__stock=-quantity,
            set__updatedAt=datetime.now(timezone.utc)
        )

        if updated == 0:
            return jsonify({
                "code": "error",
                "message": "Pet cần mua đã hết hàng hoặc số lượng không đủ!",
                "order_id": str(order.id)
            })

        pet = Pet.objects(id=pet_id).first()

        # 4. Create OrderDetail
        OrderDetail(
            order_id=order.id,
            pet_id=pet_id,
            quantity=quantity,
            order_detail_total=pet.price * quantity
        ).save()

        total += pet.price * quantity
        pet_names.append(pet.name)

    # 5. Update total
    order.update(total=total)

    # 6. Send email
    send_order_email(
        data.get("email"),
        str(order.id),
        total,
        pet_names
    )

    if payment_method == "zalopay":
        order_data = {
            "app_id": 2554,
            "app_user": "5Pets",
            "app_time": int(time.time() * 1000),
            "amount": int(total),
            "app_trans_id": datetime.datetime.now().strftime("%y%m%d") + "_" + str(order.id),
            "bank_code": "zalopayapp",
            "embed_data": "{}",
            "item": "[]",
            "callback_url": os.getenv("NGROK_URL") + "/order/callback/zalopay/" + str(order.id),
            "description": f"Thanh toán đơn hàng {str(order.id)}",
            "mac": ""
        }

        hmac_input = (
            f"{order_data['app_id']}|"
            f"{order_data['app_trans_id']}|"
            f"{order_data['app_user']}|"
            f"{order_data['amount']}|"
            f"{order_data['app_time']}|"
            f"{order_data['embed_data']}|"
            f"{order_data['item']}"
        )
        mac = hmac.new(
            ZALOPAY_CONFIG["key1"].encode("utf-8"),
            hmac_input.encode("utf-8"),
            hashlib.sha256
        ).hexdigest()
        order_data["mac"] = mac

        response = requests.post(
            ZALOPAY_CONFIG["endpoint"],
            headers={"Content-Type": "application/x-www-form-urlencoded"},
            data=order_data
        )

        zalopay_result = response.json()

        return jsonify({
            "code": "success",
            "message": "Đặt hàng thành công!",
            "order_id": str(order.id),
            "zalopay": zalopay_result
        })
    
    if payment_method == "momo":
        MOMO_CONFIG = {
            "endpoint": "https://test-payment.momo.vn/v2/gateway/api/create",
            "partnerCode": "MOMO",
            "accessKey": "F8BBA842ECF85",
            "secretKey": "K951B6PE1waDMi640xX08PD3vg6EkVlz",
            "redirectUrl": os.getenv("NGROK_URL") + "/order/callback/momo/" + str(order.id),
            "ipnUrl": os.getenv("NGROK_URL") + "/order/callback/momo/" + str(order.id),
            "amount": str(int(total)),
            "orderId": str(order.id),
            "requestId": str(order.id),
            "requestType": "captureWallet",
            "extraData": "",
            "orderInfo": f"Pay with momo - Order: {str(order.id)}"
        }

        rawSignature = "accessKey=" + MOMO_CONFIG["accessKey"] + "&amount=" + MOMO_CONFIG["amount"] + "&extraData=" + MOMO_CONFIG["extraData"] + "&ipnUrl=" + MOMO_CONFIG["ipnUrl"] + "&orderId=" + MOMO_CONFIG["orderId"] + "&orderInfo=" + MOMO_CONFIG["orderInfo"] + "&partnerCode=" + MOMO_CONFIG["partnerCode"] + "&redirectUrl=" + MOMO_CONFIG["redirectUrl"] + "&requestId=" + MOMO_CONFIG["requestId"] + "&requestType=" + MOMO_CONFIG["requestType"]
        h = hmac.new(bytes(MOMO_CONFIG["secretKey"], 'ascii'), bytes(rawSignature, 'ascii'), hashlib.sha256)
        signature = h.hexdigest()
        
        order_data = {
            'partnerCode': MOMO_CONFIG["partnerCode"],
            'partnerName': "Test",
            'storeId': "MomoTestStore",
            'requestId': MOMO_CONFIG["requestId"],
            'amount': MOMO_CONFIG["amount"],
            'orderId': MOMO_CONFIG["orderId"],
            'orderInfo': MOMO_CONFIG["orderInfo"],
            'redirectUrl': MOMO_CONFIG["redirectUrl"],
            'ipnUrl': MOMO_CONFIG["ipnUrl"],
            'lang': "vi",
            'extraData': MOMO_CONFIG["extraData"],
            'requestType': MOMO_CONFIG["requestType"],
            'signature': signature
        }

        data = json.dumps(order_data)
        clen = len(data)
        response = requests.post(MOMO_CONFIG["endpoint"], data=data, headers={'Content-Type': 'application/json', 'Content-Length': str(clen)})
        momo_result = response.json()
        return jsonify({
            "code": "success",
            "message": "Đặt hàng thành công!",
            "order_id": str(order.id),
            "momo": momo_result
        })

    return jsonify({
        "code": "success",
        "message": "Đặt hàng thành công!",
        "order_id": str(order.id)
    })

@order_bp.route('/detail/<order_id>', methods=['GET'])
def get_order_detail(order_id):
    order = Order.objects(id=order_id).first()
    if not order:
        return jsonify({
            "code": "error",
            "message": "Đơn hàng không tồn tại!",
        })
    
    order_detail = {
        "order_id": str(order.id),
        "payment_method": order.payment_method,
        "total": order.total,
        "address": order.address,
        "phone": order.phone,
        "note": order.note,
    }

    order_details = OrderDetail.objects(order_id=order.id)
    pets = []
    for detail in order_details:
        pet_id = str(detail.pet_id.id)
        pet = Pet.objects(id=pet_id).first()
        if pet:
            pets.append({
                "pet_id": str(pet.id),
                "name": pet.name,
                "price": pet.price,
                "quantity": detail.quantity,
                "order_detail_total": detail.order_detail_total,
                "imageList": pet.imageList
            })

    order_detail["pets"] = pets

    customer = Customer.objects(id=order.customer_id.id).first()
    if customer:
        order_detail["customer"] = {
            "customer_id": str(customer.id),
            "fullname": customer.fullname,
            "email": customer.email
        }

    return jsonify({
        "code": "success",
        "message": "Lấy thông tin đơn hàng thành công!",
        "order_detail": order_detail
    })

@order_bp.route('/list', methods=['POST'])
def get_order_list():
    data = request.get_json()
    email = data.get("email")
    customer = Customer.objects(email=email).first()
    if not customer:
        return jsonify({
            "code": "error",
            "message": "Khách hàng không tồn tại!",
        })

    orders = Order.objects(customer_id=customer.id).order_by('-id')
    order_list = []
    for order in orders:
        customer_detail = Customer.objects(id=order.customer_id.id).first()
        if not customer_detail:
            continue

        order_detail = OrderDetail.objects(order_id=order.id)
        if not order_detail:
            continue

        detail_list = []
        for detail in order_detail:
            pet = Pet.objects(id=detail.pet_id.id).first()
            if not pet:
                continue

            detail_list.append({
                "pet_id": str(pet.id),
                "name": pet.name,
                "price": pet.price,
                "quantity": detail.quantity,
                "order_detail_total": detail.order_detail_total,
                "imageList": pet.imageList
            })


        order_list.append({
            "order_id": str(order.id),
            "payment_method": order.payment_method,
            "total": order.total,
            "address": order.address,
            "phone": order.phone,
            "total" : order.total,
            "customer": {
                "fullname": customer_detail.fullname,
                "email": customer_detail.email
            },
            "order_details": detail_list,
            "status": order.status
        })

    return jsonify({
        "code": "success",
        "message": "Lấy danh sách đơn hàng thành công!",
        "order_list": order_list
    })

@order_bp.route('/callback/zalopay/<order_id>', methods=['POST'])
def zalopay_callback(order_id):
    data = request.get_json()
    # Handle Zalopay callback logic here
    Order.objects(id=order_id).update(status="paid")
    return jsonify({
        "code": "success",
        "message": "Payment status updated successfully!",
        "data": data
    })

@order_bp.route('/callback/momo', methods=['POST'])
def momo_callback():
    data = request.get_json()
    # Handle Momo callback logic here
    order_id = data.get("orderId")
    if order_id:
        Order.objects(id=order_id).update(status="paid")
    return jsonify({
        "code": "success",
        "message": "Payment status updated successfully!",
        "data": data
    })