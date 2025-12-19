from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import mongoengine as me
import os
from flask_mail import Mail
import cloudinary
import cloudinary.uploader
import cloudinary.api

from ai.data_loader import DataLoader
from ai.embedder import Embedder
from ai.retriever import Retriever
from ai.prompt_builder import PromptBuilder
from ai.consultant import Consultant

load_dotenv()

jwt = JWTManager()

mail = Mail()

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET")
)

def create_app():
    app = Flask(__name__)

    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

    app.config["MAIL_SERVER"] = os.getenv("MAIL_SERVER")
    app.config["MAIL_PORT"] = os.getenv("MAIL_PORT")
    app.config["MAIL_USE_TLS"] = os.getenv("MAIL_USE_TLS")
    app.config["MAIL_USERNAME"] = os.getenv("MAIL_USERNAME")
    app.config["MAIL_PASSWORD"] = os.getenv("MAIL_PASSWORD")
    app.config["MAIL_DEFAULT_SENDER"] = os.getenv("MAIL_DEFAULT_SENDER")

    mail.init_app(app)

    me.connect(host=os.getenv("MONGODB_URI"))

    CORS(
        app,
        supports_credentials=True
    )

    jwt.init_app(app)

    # --- Khởi tạo AI Consultant (Singleton)---
    print("Đang khởi tạo AI Consultant...")
    loader = DataLoader()
    documents = loader.load_data()
    embedder = Embedder()
    # Khởi tạo retriever và build index
    retriever = Retriever(embedder=embedder, documents=documents)
    prompt_builder = PromptBuilder(shop_name="5Pets")
    # Khởi tạo consultant
    ai_bot = Consultant(retriever=retriever, prompt_builder=prompt_builder)
    app.config['AI_CONSULTANT'] = ai_bot
    print("AI Consultant đã sẵn sàng!")

    from routes.admin import admin_bp
    app.register_blueprint(admin_bp)

    from routes.client import client_bp
    app.register_blueprint(client_bp)

    return app