from time import strftime
from datetime import datetime
from flask import jsonify, make_response, request, g
from . import category_bp
from middleware.cloudinary import upload_to_cloudinary
from middleware.adminAuth import admin_required
from model.category import Category
from model.admin import Admin

@category_bp.route('/create', methods=['POST'])
@admin_required
@upload_to_cloudinary
def adminCreateCategoryPost():
  name = request.form.get("name")
  parent = request.form.get("parent")
  avatar = request.cloudinary_result.get("urls")[0] if request.cloudinary_result and request.cloudinary_result.get("urls") else None

  newRecord = Category(
    name=name,
    parent=parent,
    avatar=avatar,
    createdBy=str(g.current_admin.id),
    updatedBy=str(g.current_admin.id)
  )
  newRecord.save()

  res = make_response(jsonify({
      "code": "success",
      "message": "Tạo danh mục thành công"
  }))
  return res

@category_bp.route('/list', methods=['GET'])
def adminCategoryListGet():
    filter = {}
    if (request.args.get("createdBy")):
        filter["createdBy"] = request.args.get("createdBy")
    
    date_filter = {}
    if (request.args.get("dateFrom")):
        try:
            date_filter["$gte"] = datetime.fromisoformat(request.args.get("dateFrom").replace("Z", "+00:00"))
        except ValueError:
            pass

    if (request.args.get("dateTo")):
        try:
            date_filter["$lte"] = datetime.fromisoformat(request.args.get("dateTo").replace("Z", "+00:00"))
        except ValueError:
            pass

    if date_filter:
        filter["createdAt__gte"] = date_filter.get("$gte")
        filter["createdAt__lte"] = date_filter.get("$lte")

    if (request.args.get("keyword")):
        filter["name__icontains"] = request.args.get("keyword")

    rawCategoryList = Category.objects().order_by('-createdAt').filter(**filter)
    categoryList = []
    for category in rawCategoryList:
        createdInfo = Admin.objects(id=category.createdBy).only('fullname').first()
        updatedInfo = Admin.objects(id=category.updatedBy).only('fullname').first()

        categoryList.append({
            "id": str(category.id),
            "name": category.name,
            "parent": category.parent,
            "avatar": category.avatar,
            "createdAt": category.createdAt.strftime("%Y-%m-%d %H:%M:%S"),
            "updatedAt": category.updatedAt.strftime("%Y-%m-%d %H:%M:%S"),
            "createdBy": createdInfo.fullname if createdInfo else "N/A",
            "updatedBy": updatedInfo.fullname if updatedInfo else "N/A"
        })

    res = make_response(jsonify({
        "code": "success",
        "message": "Lấy danh sách danh mục thành công",
        "data": categoryList
    }))
    return res

@category_bp.route('/delete/<categoryId>', methods=['DELETE'])
@admin_required
def adminDeleteCategoryDelete(categoryId):
    category = Category.objects(id=categoryId).first()
    if not category:
        return make_response(jsonify({
            "code": "error",
            "message": "Danh mục không tồn tại"
        }))

    category.delete()
    res = make_response(jsonify({
        "code": "success",
        "message": "Xóa danh mục thành công"
    }))
    return res

@category_bp.route('/multi-delete', methods=['DELETE'])
@admin_required
def adminCategoryMultiDeleteDelete():
    data = request.get_json()
    idList = data.get("idList", [])

    if not idList or not isinstance(idList, list):
        return make_response(jsonify({
            "code": "error",
            "message": "Danh sách ID danh mục không hợp lệ"
        }))

    deleted_count = 0
    for categoryId in idList:
        category = Category.objects(id=categoryId).first()
        if category:
            category.delete()
            deleted_count += 1

    res = make_response(jsonify({
        "code": "success",
        "message": f"Đã xóa {deleted_count} danh mục thành công"
    }))
    return res