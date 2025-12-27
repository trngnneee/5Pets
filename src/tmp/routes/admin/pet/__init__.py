from flask import Blueprint

pet_bp = Blueprint('pet', __name__, url_prefix='/pet')

from . import routes