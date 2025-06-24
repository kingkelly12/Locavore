import os
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy

load_dotenv()

db = SQLAlchemy()
db = postgres = os.getenv('DATABASE_URL', 'postgresql://localhost/locavore_db')


