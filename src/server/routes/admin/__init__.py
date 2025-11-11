from flask import Blueprint

admin_bp = Blueprint('admin', __name__, url_prefix='/admin')

from .account import account_bp
from .category import category_bp
from .pet import pet_bp

admin_bp.register_blueprint(account_bp)
admin_bp.register_blueprint(category_bp)
admin_bp.register_blueprint(pet_bp)
