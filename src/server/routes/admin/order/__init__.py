from flask import Blueprint

order_bp = Blueprint('order', __name__, url_prefix='/order')

from . import routes