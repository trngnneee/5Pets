from flask import jsonify, make_response
from . import category_bp
from model.category import Category
from helper.buildCategoryTree import build_category_tree

@category_bp.route('/list', methods=['GET'])
def get_categories():
    rawCategoryList = Category.objects().order_by('-createdAt')
    categoryList = []
    for category in rawCategoryList:
        categoryList.append({
            "id": str(category.id),
            "name": category.name,
            "parent": category.parent,
            "avatar": category.avatar,
        })

    categoryList = build_category_tree(categoryList)

    res = make_response(jsonify({
        "code": "success",
        "message": "Lấy danh sách tất cả danh mục thành công",
        "data": categoryList
    }))
    return res