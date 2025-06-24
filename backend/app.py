from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

db = SQLAlchemy(app)
jwt = JWTManager(app)
CORS(app)

from routes.auth import auth_bp
from routes.vendors import vendors_bp
from routes.reviews import reviews_bp

app.register_blueprint(auth_bp)
app.register_blueprint(vendors_bp)
app.register_blueprint(reviews_bp)

if __name__ == '__main__':
    app.run(debug=True)
