import json
from helper.getAllChildCategoryID import getAllChildCategoryID
import cloudinary.uploader
from . import pet_bp
from datetime import datetime, timezone
from flask import make_response, jsonify, request, g
from middleware.cloudinary import upload_to_cloudinary
from middleware.adminAuth import admin_required
from model.pet import Pet
from model.admin import Admin
from slugify import slugify

@pet_bp.route('/create', methods=['POST'])
@admin_required
@upload_to_cloudinary
def adminCreatePetPost():
    name = request.form.get('name')
    category = request.form.get('category')
    age = request.form.get('age')
    gender = request.form.get('gender')
    price = request.form.get('price')
    color = request.form.get('color')
    description = request.form.get('description')
    stock = request.form.get('stock')
    imageList = request.cloudinary_result.get("urls") if request.cloudinary_result and request.cloudinary_result.get("urls") else []

    new_pet = Pet(
        name=name,
        category=category,
        age=age,
        gender=gender,
        price=price,
        color=color,
        description=description,
        imageList=imageList,
        createdBy=str(g.current_admin.id),
        updatedBy=str(g.current_admin.id),
        color_slug=slugify(color),
        slug=slugify(name),
        stock=stock,
    )
    new_pet.save()
    
    res = make_response(jsonify({
        "code": "success",
        "message": "Tạo mới pet thành công",
    }))
    return res

@pet_bp.route('/list', methods=['GET'])
def getPetList():
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

    # Category Filter
    if request.args.get("category"):
        category_id = request.args.get("category")
        category_ids = getAllChildCategoryID(category_id)
        filter["category__in"] = category_ids

    # Pagination
    totalItem = Pet.objects.filter(**filter).count()
    limit = 5
    totalPages = (totalItem + limit - 1) // limit

    page = int(request.args.get("page", 1))
    offset = (page - 1) * limit

    rawPetList = Pet.objects().order_by('-createdAt').filter(**filter)[offset:offset + limit]

    pet_list = []
    for pet in rawPetList:
        createdInfo = Admin.objects(id=pet.createdBy).only('fullname').first()
        updatedInfo = Admin.objects(id=pet.updatedBy).only('fullname').first()

        pet_list.append({
            "id": str(pet.id),
            "name": pet.name,
            "category": pet.category,
            "age": pet.age,
            "gender": pet.gender,
            "price": pet.price,
            "color": pet.color,
            "description": pet.description,
            "imageList": pet.imageList,
            "createdAt": pet.createdAt.strftime("%Y-%m-%d %H:%M:%S"),
            "updatedAt": pet.updatedAt.strftime("%Y-%m-%d %H:%M:%S"),
            "createdBy": createdInfo.fullname if createdInfo else "N/A",
            "updatedBy": updatedInfo.fullname if updatedInfo else "N/A"
        })
    
    res = make_response(jsonify({
        "code": "success",
        "message": "Lấy danh sách pet thành công",
        "data": pet_list,
        "totalPages": totalPages
    }))
    return res

@pet_bp.route('/delete/<petID>', methods=['DELETE'])
@admin_required
def adminDeletePet(petID):
    pet = Pet.objects(id=petID).first()
    if not pet:
        return make_response(jsonify({
            "code": "error",
            "message": "Pet không tồn tại"
        }))

    pet.delete()
    res = make_response(jsonify({
        "code": "success",
        "message": "Xóa pet thành công"
    }))
    return res

@pet_bp.route('/multi-delete', methods=['DELETE'])
@admin_required
def adminPetMultiDelete():
    data = request.get_json()
    idList = data.get("idList", [])

    if not idList or not isinstance(idList, list):
        return make_response(jsonify({
            "code": "error",
            "message": "Danh sách ID danh mục không hợp lệ"
        }))

    deleted_count = 0
    for petId in idList:
        pet = Pet.objects(id=petId).first()
        if pet:
            pet.delete()
            deleted_count += 1

    res = make_response(jsonify({
        "code": "success",
        "message": f"Đã xóa {deleted_count} pet thành công"
    }))
    return res

@pet_bp.route('/detail/<petID>', methods=['GET'])
def getPetDetail(petID):
    pet = Pet.objects(id=petID).first()
    if not pet:
        return make_response(jsonify({
            "code": "error",
            "message": "Pet không tồn tại"
        }))

    createdInfo = Admin.objects(id=pet.createdBy).only('fullname').first()
    updatedInfo = Admin.objects(id=pet.updatedBy).only('fullname').first()

    pet_detail = {
        "id": str(pet.id),
        "name": pet.name,
        "category": pet.category,
        "age": pet.age,
        "gender": pet.gender,
        "price": pet.price,
        "color": pet.color,
        "description": pet.description,
        "imageList": pet.imageList,
        "createdAt": pet.createdAt.strftime("%Y-%m-%d %H:%M:%S"),
        "updatedAt": pet.updatedAt.strftime("%Y-%m-%d %H:%M:%S"),
        "createdBy": createdInfo.fullname if createdInfo else "N/A",
        "updatedBy": updatedInfo.fullname if updatedInfo else "N/A"
    }

    res = make_response(jsonify({
        "code": "success",
        "message": "Lấy chi tiết pet thành công",
        "data": pet_detail
    }))
    return res

@pet_bp.route('/update/<petID>', methods=['POST'])
@admin_required
@upload_to_cloudinary
def adminEditPetPost(petID):
    pet = Pet.objects(id=petID).first()
    if not pet:
        return make_response(jsonify({
            "code": "error",
            "message": "Pet không tồn tại"
        }))

    name = request.form.get('name')
    category = request.form.get('category')
    gender = request.form.get('gender')

    try:
        age = float(request.form.get('age') or 0)
    except (ValueError, TypeError):
        age = 0

    try:
        price = float(request.form.get('price') or 0)
    except (ValueError, TypeError):
        price = 0

    color = request.form.get('color')
    description = request.form.get('description')

    existing_images = json.loads(request.form.get('existingImages', '[]'))

    new_images = []
    if request.cloudinary_result and request.cloudinary_result.get("urls"):
        new_images = request.cloudinary_result.get("urls")

    imageList = existing_images + new_images

    pet.name = name
    pet.category = category
    pet.age = age
    pet.gender = gender
    pet.price = price
    pet.color = color
    pet.description = description
    pet.imageList = imageList
    pet.updatedBy = str(g.current_admin.id)
    pet.updatedAt = datetime.now(timezone.utc)
    pet.save()

    return jsonify({
        "code": "success",
        "message": "Cập nhật pet thành công"
    })

@pet_bp.route('/import', methods=['POST'])
@admin_required
def importPets():
    if 'file' not in request.files:
        return jsonify({
            "code": "error",
            "message": "Không có file trong request"
        }), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({
            "code": "error",
            "message": "Chưa chọn file nào"
        }), 400

    try:
        data = json.load(file)  
    except Exception as e:
        return jsonify({
            "code": "error",
            "message": f"Lỗi đọc file JSON: {e}"
        }), 400

    pets = []
    for name, info in data.items():
        pet = {
            "name": name,
            "age": info.get("more_information", {}).get("Tháng tuổi", 0),
            "gender": info.get("more_information", {}).get("Giới tính", "Khác"),
            "price": info.get("price", 0),
            "color": info.get("more_information", {}).get("Màu", "Không xác định"),
            "description": info.get("description", "")[0] if info.get("description") else "",
            "category": info.get("categoryId"),
            "imageList": [],
            "createdBy": str(g.current_admin.id),
            "updatedBy": str(g.current_admin.id),
            "createdAt": datetime.now(timezone.utc),
            "updatedAt": datetime.now(timezone.utc),
            "color_slug": slugify(info.get("more_information", {}).get("Màu", "Không xác định")),
            "slug": slugify(name)
        }

        for img_url in info.get("link_image_file", []):
            try:
                upload_result = cloudinary.uploader.upload(
                    img_url,
                    use_filename=True,
                    unique_filename=False,
                    overwrite=True
                )
                pet["imageList"].append(upload_result["secure_url"])
            except Exception as e:
                print(f"Upload lỗi {img_url}: {e}")

        pets.append(pet)

    if pets:
        Pet.objects.insert([Pet(**pet) for pet in pets])

    return jsonify({
        "code": "success",
        "message": f"Import {len(pets)} thú cưng thành công",
    })