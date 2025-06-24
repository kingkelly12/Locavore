import os
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

load_dotenv()

from app import app

db = SQLAlchemy(app)
migrate = Migrate(app, db)