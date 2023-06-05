# 📚 Review With Students:
# The dangers of plain text passwords
# What Hashing is
# Hashing vs encryption
# How to Hash a string
# Salting
# Rainbow Tables
# Bcrypt

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property

# 3.✅ Import bcyrpt from app


from config import db, bcrypt


class Production(db.Model, SerializerMixin):
    __tablename__ = 'productions'

    __table_args__ = (
        db.CheckConstraint('budget > 100'),
    )

    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String, nullable=False)
    genre = db.Column(db.String, nullable=False)
    budget = db.Column(db.Float)
    image = db.Column(db.String)
    director = db.Column(db.String)
    description = db.Column(db.String)
    ongoing = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    cast_members = db.relationship('CastMember', backref='production')

    serialize_rules = ('-cast_members.production',)

    @validates('image')
    def validate_image(self, key, image_path):
        if '.jpg' not in image_path:
            raise ValueError("Image file type must be a jpg")
        return image_path

    def __repr__(self):
        return f'<Production Title:{self.title}, Genre:{self.genre}, Budget:{self.budget}, Image:{self.image}, Director:{self.director},ongoing:{self.ongoing}>'


class CastMember(db.Model, SerializerMixin):
    __tablename__ = 'cast_members'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    role = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    production_id = db.Column(db.Integer, db.ForeignKey('productions.id'))

    serialize_rules = ('-production.cast_members',)

    def __repr__(self):
        return f'<Production Name:{self.name}, Role:{self.role}'


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)

    # 4.✅ Add a column _password_hash
    _password_hash = db.Column(db.String)
    admin = db.Column(db.String, default=False)

    # 5.✅ Create a hybrid_property

    serialize_rules = ("-_password_hash",)

    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes may not be viewed.')

    # 11.✅ Create a setter method called password_hash that takes self and a password.
        # 11.1 Use bcyrpt to generate the password hash with bcrypt.generate_password_hash
        # 11.2 Set the _password_hash to the hashed password
    # user.password_hash('cow')
    # lsib#482#^**2nkjdfhgh
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

     # 12.✅ Create an authenticate method that uses bcyrpt to verify the password against the hash in the DB with bcrypt.check_password_hash
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
     # 13.✅ Navigate to app

    def __repr__(self):
        return f'USER: ID: {self.id}, Name {self.name}, Email: {self.email}, Admin: {self.admin}'
