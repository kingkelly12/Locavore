from app import app, db
from models.user import User
from models.vendor import Vendor
from models.review import Review

# This script seeds the database with initial data for users, vendors, and reviews.
with app.app_context():
    db.drop_all()
    db.create_all()

    # Users
    user1 = User(username='alice', email='alice@example.com')
    user1.set_password('password123')
    user2 = User(username='bob', email='bob@example.com')
    user2.set_password('password456')

    db.session.add_all([user1, user2])
    db.session.commit()

    # Vendors
    vendor1 = Vendor(name='Fresh Farm', location='123 Market St', description='Local produce and eggs', owner_id=user1.id)
    vendor2 = Vendor(name='Herbal Garden', location='456 Herb Rd', description='Organic herbs and teas', owner_id=user2.id)

    db.session.add_all([vendor1, vendor2])
    db.session.commit()

    # Reviews
    review1 = Review(content='Amazing veggies!', rating=5, vendor_id=vendor1.id, user_id=user2.id)
    review2 = Review(content='Loved the herbal tea.', rating=4, vendor_id=vendor2.id, user_id=user1.id)

    db.session.add_all([review1, review2])
    db.session.commit()

    print("Database seeded successfully.")
