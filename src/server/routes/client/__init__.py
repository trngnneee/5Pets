from flask import Blueprint

client_bp = Blueprint('client', __name__, url_prefix='/')

from .category import category_bp
from .pet import pet_bp
from .breadcrumb import breadcrumb_bp
from .order import order_bp

client_bp.register_blueprint(category_bp)
client_bp.register_blueprint(pet_bp)
client_bp.register_blueprint(breadcrumb_bp)
client_bp.register_blueprint(order_bp)