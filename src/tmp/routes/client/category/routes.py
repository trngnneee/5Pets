from flask import jsonify, make_response
from helper.getAllChildCategoryID import getAllChildCategoryID
from . import category_bp
from model.category import Category
from helper.buildCategoryTree import buildCategoryTree
from model.pet import Pet

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
    
    categoryList = buildCategoryTree(categoryList)

    res = make_response(jsonify({
        "code": "success",
        "message": "Lấy danh sách tất cả danh mục thành công",
        "data": categoryList,
    }))
    return res

@category_bp.route('/color/list/<categoryID>', methods=['GET'])
def get_color_categories(categoryID):
    allChildId = getAllChildCategoryID(categoryID)
    allCategoryId = allChildId + [categoryID]

    rawPetList = Pet.objects(category__in=allCategoryId).order_by('-createdAt')
    colorList = []
    
    colorSet = set()
    for pet in rawPetList:
        if pet.color_slug not in colorSet:
            colorSet.add(pet.color_slug)
            colorList.append({
                "color": pet.color,
                "color_slug": pet.color_slug
            })

    res = make_response(jsonify({
        "code": "success",
        "message": "Lấy danh sách danh mục màu sắc thành công",
        "data": colorList,
    }))
    return res