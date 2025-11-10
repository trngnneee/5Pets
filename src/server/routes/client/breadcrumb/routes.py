from . import breadcrumb_bp
from flask import jsonify, make_response
from model.category import Category

@breadcrumb_bp.route('/<categoryID>', methods=['GET'])
def get_breadcrumb(categoryID):
  category = Category.objects(id=categoryID).first()
  if not category:
    res = make_response(jsonify({
      "status": "error",
      "message": "Danh mục không tồn tại",
    }))
    return res
  
  breadcrumb = []
  def build_breadcrumb(cat):
    if cat:
      if cat.parent:
        parent_cat = Category.objects(id=cat.parent).first()
        build_breadcrumb(parent_cat)
      breadcrumb.append({
        "id": str(cat.id),
        "name": cat.name,
      })

  build_breadcrumb(category)

  res = make_response(jsonify({
    "code": "success",
    "message": "Lấy breadcrumb thành công",
    "data": breadcrumb
  }))
  return res