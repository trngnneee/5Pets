from flask import request, jsonify
from . import chatbot_bp
from helper.ai_service.chatbot_router_service import handle_query

@chatbot_bp.route("", methods=["POST"])
def chatbot():
    print("Call this function chatbot")
    data = request.json or {}
    user_msg = data.get("message", "").strip()

    if not user_msg:
        return jsonify({"code": "error", "message": "Vui lòng nhập câu hỏi"}), 400

    answer = handle_query(user_msg)

    return jsonify({"code": "success", "answer": answer})