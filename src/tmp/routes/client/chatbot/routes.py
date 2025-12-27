from . import chatbot_bp
from flask import request, jsonify, current_app

@chatbot_bp.route('/answer', methods=['POST'])
def chat():
  data = request.get_json()
  user_message = data.get('message', '')

  ai_consultant = current_app.config['AI_CONSULTANT']
  response = ai_consultant.answer(user_message)

  return jsonify({
      "code": "success",
      "response": response
  })