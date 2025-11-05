from flask import Blueprint

admin_bp = Blueprint('admin', __name__, url_prefix='/admin')

from .account import account_bp

admin_bp.register_blueprint(account_bp)