import os
from . import order_bp
from flask import request, jsonify
from model.customer import Customer
from model.order import Order
from model.order_detail import OrderDetail
from model.pet import Pet
import datetime
import time
import hmac
import hashlib
import requests

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

    for pet_id in idList:
        petDetail = Pet.objects(id=pet_id).first()
        if not petDetail:
            continue

        total += petDetail.price

        OrderDetail(
            order_id=order.id,
            pet_id=pet_id,
            quantity=1,
            order_detail_total=petDetail.price
        ).save()

    order.update(total=total)

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
            "callback_url": "https://6224e9104cad.ngrok-free.app/order/callback/zalopay/" + str(order.id),
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