from . import order_bp
from flask import request, jsonify
from model.customer import Customer
from model.order import Order
from model.order_detail import OrderDetail
from model.pet import Pet

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
