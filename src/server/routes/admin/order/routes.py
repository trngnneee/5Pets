from flask import jsonify, request, g
from model.customer import Customer
from . import order_bp
from model.order import Order
from model.order_detail import OrderDetail
from model.pet import Pet
from model.admin import Admin
from middleware.adminAuth import admin_required
from datetime import datetime

@order_bp.route('/list', methods=['GET'])
def list_orders():
     # Pagination and Filtering
    filter = {}
    totalItem = Order.objects.filter(**filter).count()
    limit = 3
    totalPages = (totalItem + limit - 1) // limit

    page = int(request.args.get("page", 1))
    offset = (page - 1) * limit

    order = Order.objects.skip(offset).limit(limit).order_by('-created_at').filter(**filter)
    orders_list = []
    for o in order:
      updated_by_detail = Admin.objects(id=o.updated_by).first()
      orders_list.append({
        "order_id": str(o.id),
        "payment_method": o.payment_method,
        "total": o.total,
        "address": o.address,
        "phone": o.phone,
        "note": o.note,
        "status": o.status,
        "updated_by": updated_by_detail.fullname if updated_by_detail else None
      })

      customer_detail = Customer.objects(id=o.customer_id.id).first()
      customer = {}
      if customer_detail:
          customer = {
            "customer_id": str(customer_detail.id),
            "fullname": customer_detail.fullname,
            "email": customer_detail.email
          }

      orders_list[-1]["customer"] = customer

      order_details = OrderDetail.objects(order_id=o.id)
      details_list = []
      for detail in order_details:
          pet = Pet.objects(id=detail.pet_id.id).first()
          if pet:
              details_list.append({
                "pet_id": str(pet.id),
                "name": pet.name,
                "price": pet.price,
                "quantity": detail.quantity,
                "order_detail_total": detail.order_detail_total,
                "imageList": pet.imageList
              })
      orders_list[-1]["order_details"] = details_list

    return jsonify({
        "code": "success",
        "message": "Lấy thông tin đơn hàng thành công!",
        "orders_list": orders_list,
        "totalPages": totalPages
    })

@order_bp.route("/update", methods=["POST"])
@admin_required
def order_update():
    data = request.json
    status = data.get("status")
    order_id = data.get("order_id")

    order = Order.objects(id=order_id).first()
    if not order:
        return jsonify({
            "code": "error",
            "message": "Đơn hàng không tồn tại!"
        })
  
    order.status = status
    order.updated_by = str(g.current_admin.id)
    order.updated_at = datetime.utcnow()
    order.save()

    return jsonify({
        "code": "success",
        "message": "Cập nhật trạng thái đơn hàng thành công!"
    })