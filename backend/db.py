from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def init_db(app):
    db.init_app(app)
    with app.app_context():
        db.create_all()
        # You can also add initial data here if needed
        # Example: db.session.add(User(username='admin', password='admin'))
        # db.session.commit()
        
