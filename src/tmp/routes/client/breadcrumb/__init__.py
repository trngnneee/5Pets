from flask import Blueprint

breadcrumb_bp = Blueprint('breadcrumb', __name__, url_prefix='/breadcrumb')

from . import routes