from functools import wraps
from flask import request, jsonify, make_response, g
from flask_jwt_extended import decode_token
from model.admin import Admin

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.cookies.get("adminToken")
        if not token:
            return jsonify({
                "code": "error",
                "message": "Bạn chưa đăng nhập"
            })

        try:
            decoded = decode_token(token)
            admin_id = decoded.get("sub")
            admin = Admin.objects(id=admin_id).first()

            if not admin:
                res = make_response(jsonify({
                    "code": "error",
                    "message": "Tài khoản không tồn tại"
                }))
                res.delete_cookie("adminToken")
                return res

            g.current_admin = admin
            return f(*args, **kwargs)

        except Exception as e:
            print("Token decode error:", e)
            res = make_response(jsonify({
                "code": "error",
                "message": "Token không hợp lệ hoặc đã hết hạn"
            }))
            res.delete_cookie("adminToken")
            return res

    return decorated_function
