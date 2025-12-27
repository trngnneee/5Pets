from flask import request, jsonify
import cloudinary.uploader
from functools import wraps

def upload_to_cloudinary(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        files = request.files.getlist('images') or request.files.getlist('file')
        urls = []

        if not files or all(f.filename == "" for f in files):
            request.cloudinary_result = {"urls": []}
            return func(*args, **kwargs)

        try:
            for file in files:
                if file and file.filename:
                    result = cloudinary.uploader.upload(file, folder="uploads/admin")
                    urls.append(result.get("secure_url"))
            request.cloudinary_result = {"urls": urls}
        except Exception as e:
            return jsonify({'error': str(e)})

        return func(*args, **kwargs)
    return wrapper

