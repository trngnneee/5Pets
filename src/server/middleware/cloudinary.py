from flask import request, jsonify
import cloudinary.uploader
from functools import wraps

def upload_to_cloudinary(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        files = request.files.getlist('file') 
        if not files or files == [None]:
            return jsonify({'error': 'No file provided'})

        urls = []
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
