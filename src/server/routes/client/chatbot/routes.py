from . import chatbot_bp
from flask import request, jsonify

@chatbot_bp.route('/', methods=['POST'])
def chat():
  return jsonify({
    "code": "success",
    "message": "Chatbot endpoint reached"
  })