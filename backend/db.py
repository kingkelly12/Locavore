import os
from dotenv import load_dotenv
from app import db

load_dotenv()


db = postgres = os.getenv('DATABASE_URL', 'postgresql://localhost/locavore_db')


