from flask import Blueprint

chatbot_bp = Blueprint('chatbot', __name__, url_prefix='/chatbot')

from . import routes