from . import pet_bp
from flask import make_response, jsonify, request
from model.pet import Pet
from model.category import Category
from helper.getAllChildCategoryID import getAllChildCategoryID

@pet_bp.route("/list", methods=["GET"])
def list_pets():
    limit = None

    if (request.args.get("limit")):
        limit = int(request.args.get("limit"))

    raw_pets = Pet.objects.limit(limit).order_by('-createdAt') if limit else Pet.objects().order_by('-createdAt')
    pet_list = []

    for pet in raw_pets:
      pet_list.append({
          "id": str(pet.id),
          "name": pet.name,
          "category": pet.category,
          "age": pet.age,
          "gender": pet.gender,
          "price": pet.price,
          "color": pet.color,
          "description": pet.description,
          "imageList": pet.imageList
      })

    res = make_response(jsonify({
        "code": "success",
        "message": 'Lấy danh sách thú cưng thành công',
        "data": pet_list,
    }))
    return res

@pet_bp.route("/list/<category_id>", methods=["GET"])
def pet_detail(category_id):
    allChildId = getAllChildCategoryID(category_id)
    allCategoryId = allChildId + [category_id]

    page = request.args.get("page", default=1, type=int)
    gender_param = request.args.get("gender")
    color_param = request.args.get("color")

    gender_list = gender_param.split(",") if gender_param else []
    color_list = color_param.split(",") if color_param else []

    query = Pet.objects(category__in=allCategoryId)

    if gender_list:
        query = query.filter(gender__in=gender_list)
    if color_list:
        regex_filters = []
        for color in color_list:
            regex_filters.append({"color": {"$regex": color, "$options": "i"}})

        query = query.filter(__raw__={"$or": regex_filters})

    itemsPerPage = 9
    totalItem = query.count()
    totalPages = (totalItem + itemsPerPage - 1) // itemsPerPage

    if page < 1:
        page = 1
    skip = (page - 1) * itemsPerPage

    rawPetList = (
        query.skip(skip)
        .limit(itemsPerPage)
        .order_by("-createdAt")
    )

    if not rawPetList: 
        res = make_response(jsonify({ "code": "error", "message": "Không tìm thấy thú cưng" })) 
        return res 
    petList = [] 
    for pet in rawPetList: 
        petList.append({ 
            "id": str(pet.id), 
            "name": pet.name, 
            "category": pet.category, 
            "age": pet.age, 
            "gender": pet.gender, 
            "price": pet.price, 
            "color": pet.color, 
            "description": pet.description, 
            "imageList": pet.imageList 
        }) 
        categoryName = Category.objects(id=category_id).first().name if Category.objects(id=category_id).first() else "Không xác định" 
        
    res = make_response(jsonify({ 
        "code": "success", 
        "message": 
        "Lấy danh sách thú cưng thành công", 
        "data": { 
            "categoryName": categoryName, 
            "petList": petList, 
            "totalPages": totalPages 
        } 
    })) 
    return res