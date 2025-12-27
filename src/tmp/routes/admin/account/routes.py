import datetime
from flask import jsonify, request, make_response, g
import bcrypt
from flask_jwt_extended import create_access_token, decode_token
from . import account_bp
from middleware.adminAuth import admin_required
from helper.OTPGen import generateOTP
from helper.FlaskMail import SendResetOTP

from model.admin import Admin
from model.forgot_password import ForgotPassword

@account_bp.route('/register', methods=['POST'])
def adminRegisterPost():
    data = request.get_json()
    fullname = data.get("fullname")
    email = data.get("email")
    password = data.get("password")

    existAdmin = Admin.objects(email=email).first()
    if existAdmin:
        return jsonify({
            "code": "error",
            "message": "Email đã tồn tại trong hệ thống"
        })

    hashed = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

    newAdmin = Admin(
        fullname=fullname,
        email=email,
        password=hashed.decode("utf-8")
    )
    newAdmin.save()

    res = make_response(jsonify({
            "code": "success",
            "message": "Đăng ký thành công!"
    }))
    
    return res

@account_bp.route('/login', methods=['POST'])
def adminLoginPost():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    rememberPassword = data.get("rememberPassword")

    existAdmin = Admin.objects(email=email).first()
    if not existAdmin:
        return jsonify({
            "code": "error",  
            "message": "Email không tồn tại trong hệ thống"
        })
    if not bcrypt.checkpw(password.encode("utf-8"), existAdmin.password.encode("utf-8")):
        return jsonify({
            "code": "error",  
            "message": "Mật khẩu không đúng"
        })
    if existAdmin.status == "initial":
        return jsonify({
            "code": "error",  
            "message": "Tài khoản của bạn đang chờ được duyệt. Vui lòng liên hệ quản trị viên."
        })
    
    access_token = create_access_token(
        identity=str(existAdmin.id),
        additional_claims={
            "email": existAdmin.email
        },
        expires_delta=datetime.timedelta(days=30 if rememberPassword else 1)
    )

    res = make_response(jsonify({
        "code": "success",  
        "message": "Đăng nhập thành công!"
    }))

    res.set_cookie(
        "adminToken", 
        access_token, 
        httponly=True, 
        samesite='None', 
        secure=True,
        max_age=30*24*60*60 if rememberPassword else 24*60*60
    )

    return res

@account_bp.route('/verify', methods=['GET'])
def adminVerifyGet():
    token = request.cookies.get("adminToken")

    if not token:
        res = make_response(
            jsonify({
                "code": "error",
                "message": "Token không tồn tại"
            })  
        ) 
        return res
    
    try:
        decoded = decode_token(token)

        if not decoded.get("sub"):
            res = make_response(jsonify({
                "code": "error",
                "message": "Token không hợp lệ"
            }))
            res.delete_cookie("adminToken")
            return res

        existUser = Admin.objects(id=decoded["sub"]).first()
        if not existUser:
            res = make_response(jsonify({
                "code": "error",
                "message": "Tài khoản không tồn tại"
            }))
            res.delete_cookie("adminToken")
            return res

        userInfo = {
            "id": str(existUser.id),
            "fullname": existUser.fullname,
            "email": existUser.email
        }
        
        return make_response({
            "code": "success",
            "message": "Token hợp lệ",
            "userInfo": userInfo
        })
    except Exception as e:
        res = make_response(jsonify({
            "code": "error",
            "message": "Token không hợp lệ"
        }))
        res.delete_cookie("adminToken")  
        return res
    
@account_bp.route('/forgot-password', methods=['POST'])
def adminForgotPasswordPost():
    data = request.get_json()
    email = data.get("email")

    existAdmin = Admin.objects(email=email).first()
    if not existAdmin:
        return jsonify({
            "code": "error",
            "message": "Email không tồn tại trong hệ thống"
        })

    existOTPRecord = ForgotPassword.objects(email=email).first()
    if existOTPRecord:
        return make_response(jsonify({
            "code": "error",
            "message": "Vui lòng chờ 5 phút trước khi yêu cầu mã OTP mới"
        }))

    otp = generateOTP(6)

    SendResetOTP(email, otp)

    newRecord = ForgotPassword(
        email=email,
        otp=otp,
        expire_at=datetime.datetime.utcnow() + datetime.timedelta(minutes=5)
    )
    newRecord.save()

    return jsonify({
        "code": "success",
        "message": "OTP đã được gửi đến email của bạn."
    })

@account_bp.route('/otp-password', methods=['POST'])
def adminOtpPasswordPost():
    data = request.get_json()
    email = data.get("email")
    otp = data.get("otp")

    existOTPRecord = ForgotPassword.objects(email=email, otp=otp).first()
    if not existOTPRecord:
        return jsonify({
            "code": "error",
            "message": "OTP không hợp lệ."
        })
    existOTPRecord.delete()

    existAdmin = Admin.objects(email=email).first()
    if not existAdmin:
        return jsonify({
            "code": "error",
            "message": "Email không tồn tại trong hệ thống"
        })

    access_token = create_access_token(
        identity=str(existAdmin.id),
        additional_claims={
            "email": existAdmin.email
        },
        expires_delta=datetime.timedelta(1)
    )

    res = make_response(jsonify({
        "code": "success",
        "message": "OTP hợp lệ."
    }))

    res.set_cookie(
        "adminToken", 
        access_token, 
        httponly=True, 
        samesite='None', 
        secure=True,
        max_age=24*60*60
    )

    return res

@account_bp.route('/reset-password', methods=['POST'])
@admin_required
def adminResetPasswordPost():
    data = request.get_json()
    password = data.get("password")

    admin = g.current_admin

    hashed = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
    admin.password = hashed.decode("utf-8")

    admin.save()

    res = make_response(jsonify({
        "code": "success",
        "message": "Đổi mật khẩu thành công!"
    }))

    return res

@account_bp.route('/list', methods=['GET'])
def adminAccountListGet():
    rawAdminList = Admin.objects(status="active")
    adminList = []
    for admin in rawAdminList:
        approvedByInfo = Admin.objects(id=admin.approvedBy).first() if admin.approvedBy else None

        adminList.append({
            "id": str(admin.id),
            "fullname": admin.fullname,
            "email": admin.email,
            "createdAt": admin.createdAt.isoformat(),
            "updatedAt": admin.updatedAt.isoformat(),
            "approvedBy": approvedByInfo.fullname if approvedByInfo else None
        })

    res = make_response(jsonify({
        "code": "success",
        "message": "Lấy danh sách tài khoản admin thành công!",
        "data": adminList
    }))

    return res

@account_bp.route('/logout', methods=['GET'])
def adminLogoutGet():
    res = make_response(jsonify({
        "code": "success",
        "message": "Đăng xuất thành công!"
    }))

    res.delete_cookie("adminToken")

    return res

@account_bp.route('/initial-list', methods=['GET'])
def list_users():
  rawUserList = Admin.objects(status="initial")

  userList = []
  for user in rawUserList:
    userList.append({
      "id": str(user.id),
      "name": user.fullname,
      "email": user.email,
    })
  
  res = make_response(jsonify({
    "code": "success",
    "message": "Lấy danh sách người dùng thành công",
    "data": userList
  }))
  return res

@account_bp.route('/approve/<user_id>', methods=['GET'])
@admin_required
def approve_user(user_id):
  user = Admin.objects(id=user_id, status="initial").first()
  if not user:
    return make_response(jsonify({
      "code": "error",
      "message": "Người dùng không tồn tại hoặc đã được duyệt"
    }))

  user.status = "active"
  user.approvedBy = str(g.current_admin.id)
  user.updatedAt = datetime.datetime.now(datetime.timezone.utc)
  user.save()

  res = make_response(jsonify({
    "code": "success",
    "message": "Duyệt tài khoản người dùng thành công"
  }))
  return res