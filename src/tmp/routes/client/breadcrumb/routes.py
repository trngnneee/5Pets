from . import breadcrumb_bp
from flask import jsonify, make_response
from model.category import Category
from model.pet import Pet

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

@breadcrumb_bp.route('/pet/<petID>', methods=['GET'])
def get_breadcrumb_by_pet(petID):
  breadcrumb = []
  pet = Pet.objects(id=petID).first()
  if not pet:
    res = make_response(jsonify({
      "status": "error",
      "message": "Pet không tồn tại",
    }))
    return res

  category = Category.objects(id=pet.category).first()
  if not category:
    res = make_response(jsonify({
      "status": "error",
      "message": "Danh mục không tồn tại",
    }))
    return res
  
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

  breadcrumb.append({
    "id": str(pet.id),
    "name": pet.name,
  })

  res = make_response(jsonify({
    "code": "success",
    "message": "Lấy breadcrumb thành công",
    "data": breadcrumb
  }))
  return res