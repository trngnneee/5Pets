from datetime import datetime, timezone
from flask import jsonify, make_response, request, g
from . import category_bp
from middleware.cloudinary import upload_to_cloudinary
from middleware.adminAuth import admin_required
from model.category import Category
from model.admin import Admin
from slugify import slugify

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
    updatedBy=str(g.current_admin.id),
    slug=slugify(name)
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
    # CreatedBy filter
    if (request.args.get("createdBy")):
        filter["createdBy"] = request.args.get("createdBy")
    
    # Date filter
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

    # Search
    if (request.args.get("keyword")):
        keyword = request.args.get("keyword")
        regex = f".*{slugify(keyword)}.*"
        filter["slug__iregex"] = regex

    # Pagination
    totalItem = Category.objects.filter(**filter).count()
    limit = 5
    totalPages = (totalItem + limit - 1) // limit

    page = int(request.args.get("page", 1))
    offset = (page - 1) * limit
    
    rawCategoryList = Category.objects().order_by('-createdAt').filter(**filter)[offset:offset + limit]
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
        "data": categoryList,
        "totalPages": totalPages
    }))
    return res

@category_bp.route('/list/all', methods=['GET'])
def adminCategoryListAllGet():
    rawCategoryList = Category.objects().order_by('-createdAt')
    categoryList = []
    for category in rawCategoryList:
        categoryList.append({
            "id": str(category.id),
            "name": category.name,
            "parent": category.parent,
            "avatar": category.avatar,
        })

    res = make_response(jsonify({
        "code": "success",
        "message": "Lấy danh sách tất cả danh mục thành công",
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
    
    child_exists = Category.objects(parent=categoryId).first()
    if child_exists:
        return make_response(jsonify({
            "code": "error",
            "message": "Không thể xóa danh mục vì vẫn còn danh mục con."
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

@category_bp.route('/detail/<categoryId>', methods=['GET'])
def adminCategoryDetailGet(categoryId):
    category = Category.objects(id=categoryId).first()
    if not category:
        return make_response(jsonify({
            "code": "error",
            "message": "Danh mục không tồn tại"
        }))

    categoryData = {
        "id": str(category.id),
        "name": category.name,
        "parent": category.parent,
        "avatar": category.avatar,
    }

    res = make_response(jsonify({
        "code": "success",
        "message": "Lấy chi tiết danh mục thành công",
        "data": categoryData
    }))
    return res

@category_bp.route('/update/<categoryId>', methods=['POST'])
@admin_required
@upload_to_cloudinary
def adminUpdateCategoryPost(categoryId):
    category = Category.objects(id=categoryId).first()
    if not category:
        return make_response(jsonify({
            "code": "error",
            "message": "Danh mục không tồn tại"
        }))

    name = request.form.get("name")
    parent = request.form.get("parent")
    avatar = request.cloudinary_result.get("urls")[0] if request.cloudinary_result and request.cloudinary_result.get("urls") else category.avatar

    category.name = name
    category.parent = parent
    category.avatar = avatar
    category.updatedBy = str(g.current_admin.id)
    category.updatedAt = datetime.now(timezone.utc)
    category.save()

    res = make_response(jsonify({
        "code": "success",
        "message": "Cập nhật danh mục thành công"
    }))
    return res