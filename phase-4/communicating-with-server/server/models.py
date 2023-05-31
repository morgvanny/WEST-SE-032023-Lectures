
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
# 6. ✅ Import `SerializerMixin` from `sqlalchemy_serializer`
from sqlalchemy_serializer import SerializerMixin
db = SQLAlchemy()
# 7. ✅ Pass `SerializerMixin` to `Productions`


class Production(db.Model, SerializerMixin):
    __tablename__ = 'productions'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    genre = db.Column(db.String)
    budget = db.Column(db.Float)
    image = db.Column(db.String)
    director = db.Column(db.String)
    description = db.Column(db.String)
    ongoing = db.Column(db.Boolean)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(
        db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    cast_members = db.relationship(
        'CastMember', backref='production', cascade="all, delete-orphan")

    @validates('image')
    def validates_image_ends_with_jpg(self, key, image):
        if not image.endswith('.jpg'):
            raise ValueError("Image must end with .jpg")
        return image

    @validates('budget')
    def validates_budget_over_100(self, key, budget):
        budget = 0 if not budget else budget
        budget = float(budget)
        if not budget > 100:
            raise ValueError("Budget must be over $100")
        return budget

    def url(self):
        # from app import api

        # return api.url_for('ProductionResource', id=self.id, _external=True)
        return f'http://127.0.0.1:5000/productions/{self.id}'

    def formatted_budget(self):
        return "${:,.2f}".format(self.budget)

    # 7.1 ✅ Create a serialize rule that will help add our `cast_members` to the response.
    serialize_rules = ('-cast_members.production',
                       '-created_at', '-updated_at', 'formatted_budget')

    def __repr__(self):
        return f'<Production Title:{self.title}, Genre:{self.genre}, Budget:{self.budget}, Image:{self.image}, Director:{self.director},ongoing:{self.ongoing}>'

# 8. ✅ Pass `SerializerMixin` to `CastMember`


class CastMember(db.Model, SerializerMixin):
    __tablename__ = 'cast_members'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    role = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    production_id = db.Column(db.Integer, db.ForeignKey('productions.id'))

    # 8.1 ✅ Create a serialize rule that will help add our `production` to the response.
    serialize_rules = ('-production.cast_member',
                       '-created_at', '-updated_at')

    def __repr__(self):
        return f'<Production Name:{self.name}, Role:{self.role}'

 # 9. ✅ Navigate back to `app.py` for further steps.
