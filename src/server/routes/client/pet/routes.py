from . import pet_bp
from flask import make_response, jsonify, request
from model.pet import Pet
from model.category import Category
from helper.getAllChildCategoryID import getAllChildCategoryID
from slugify import slugify

@pet_bp.route("/list", methods=["GET"])
def list_pets():
    limit = None
    gender = None

    if (request.args.get("limit")):
        limit = int(request.args.get("limit"))

    if (request.args.get("gender")):
        gender = request.args.get("gender")

    random = request.args.get("random", "false").lower() == "true"
    if random:
        import random as rand
        total_pets = Pet.objects.count()
        if limit and total_pets > limit:
            random_indices = rand.sample(range(total_pets), limit)
            raw_pets = [Pet.objects.skip(i).first() for i in random_indices]
        else:
            raw_pets = list(Pet.objects)
    else:
        raw_pets = Pet.objects.limit(limit).order_by('-createdAt') if limit else Pet.objects().order_by('-createdAt')

    if gender:
        raw_pets = raw_pets.filter(gender=gender)
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
        query = query.filter(color_slug__in=color_list)

    itemsPerPage = 3 * 5
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

@pet_bp.route("/detail/<pet_id>", methods=["GET"])
def pet_info(pet_id):
    pet = Pet.objects(id=pet_id).first()
    if not pet:
        res = make_response(jsonify({
            "code": "error",
            "message": "Không tìm thấy thú cưng"
        }))
        return res

    pet_data = {
        "id": str(pet.id),
        "name": pet.name,
        "category": pet.category,
        "age": pet.age,
        "gender": pet.gender,
        "price": pet.price,
        "color": pet.color,
        "description": pet.description,
        "imageList": pet.imageList
    }
    res = make_response(jsonify({
        "code": "success",
        "message": "Lấy thông tin thú cưng thành công",
        "data": pet_data
    }))
    return res

@pet_bp.route("/search", methods=["GET"])
def search_pets():  
    keyword = request.args.get("keyword", "")
    if not keyword:
        res = make_response(jsonify({
            "code": "error",
            "message": "Vui lòng cung cấp từ khóa tìm kiếm"
        }))
        return res
    
    regex = f".*{slugify(keyword)}.*"
    print(regex)
    raw_pets = Pet.objects(slug__iregex=regex).order_by('-createdAt')
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

    if not pet_list:
        res = make_response(jsonify({
            "code": "error",
            "message": "Không tìm thấy thú cưng phù hợp"
        }))
        return res
    res = make_response(jsonify({
        "code": "success",
        "message": "Tìm kiếm thú cưng thành công",
        "data": pet_list
    }))
    return res

@pet_bp.route("/detail-list", methods=["POST"])
def pet_detail_list():
    data = request.json
    id_list = data.get("idList", [])
    if not id_list:
        res = make_response(jsonify({
            "code": "error",
            "message": "Vui lòng cung cấp danh sách ID thú cưng"
        }))
        return res
    
    raw_pets = Pet.objects(id__in=id_list).order_by('-createdAt')
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

    if not pet_list:
        res = make_response(jsonify({
            "code": "error",
            "message": "Không tìm thấy thú cưng phù hợp"
        }))
        return res
    
    res = make_response(jsonify({
        "code": "success",
        "message": "Lấy danh sách thú cưng thành công",
        "data": pet_list
    }))
    return res