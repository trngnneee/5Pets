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
        "message": "Đặt hàng thành công!"
    })