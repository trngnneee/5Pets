from . import pet_bp
from flask import make_response, jsonify, request
from model.pet import Pet

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
        "data": pet_list
    }))
    return res