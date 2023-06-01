from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

metadata = MetaData(naming_convention=convention)

db = SQLAlchemy(metadata=metadata)


class Planet(db.Model, SerializerMixin):
    __tablename__ = 'planets'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    distance_from_earth = db.Column(db.String)
    nearest_star = db.Column(db.String)
    image = db.Column(db.String)

    missions = db.relationship("Mission", backref="planet")

    scientists = association_proxy('missions', 'scientist')

    # serialize_rules = ("-missions",)

    def __repr__(self):
        return f'<Planet {self.id}: {self.name}>'


class Scientist(db.Model, SerializerMixin):
    __tablename__ = 'scientists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    field_of_study = db.Column(db.String, nullable=False)
    avatar = db.Column(db.String)

    @validates('name')
    def validate_name(self, key, value):
        if not value:
            raise ValueError("Name can't be blank and must be unique.")
        return value

    @validates('field_of_study')
    def validate_field_of_study(self, key, value):
        if not value:
            raise ValueError("Field of study can't be blank.")
        return value

    missions = db.relationship(
        "Mission", backref="scientist", cascade="all, delete-orphan")

    planets = association_proxy('missions', 'planet')

    serialize_rules = ("-missions", "planets", "-planets.missions")

    def __repr__(self):
        return f'<Scientist {self.id}: {self.name}>'


class Mission(db.Model, SerializerMixin):
    __tablename__ = 'missions'

    __table_args__ = (db.UniqueConstraint('planet_id', 'scientist_id'),)

    @validates('budget')
    def validate_budget(self, key, value):
        value = int(value)
        if value not in range(1000, 10001):
            raise ValueError("Budget out of acceptable range.")
        return value

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    scientist_id = db.Column(db.Integer, db.ForeignKey(
        'scientists.id'), nullable=False)
    planet_id = db.Column(db.Integer, db.ForeignKey(
        'planets.id'), nullable=False)


# add any models you may need.
