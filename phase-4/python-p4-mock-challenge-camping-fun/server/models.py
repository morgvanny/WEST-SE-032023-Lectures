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


class Activity(db.Model, SerializerMixin):
    __tablename__ = 'activities'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    difficulty = db.Column(db.Integer)

    serialize_rules = ("-signups",)

    signups = db.relationship(
        'Signup', backref="activity", cascade="all, delete-orphan")
    campers = association_proxy('signups', 'camper')

    def __repr__(self):
        return f'<Activity {self.id}: {self.name}>'


class Camper(db.Model, SerializerMixin):
    __tablename__ = 'campers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    age = db.Column(db.Integer)

    signups = db.relationship('Signup', backref='camper')
    activities = association_proxy('signups', 'activity')

    serialize_rules = ('-signups', 'activities')

    @validates('name')
    def validates_presence_of_name(self, key, value):
        if not value:
            raise ValueError("Campers require a name.")
        return value

    @validates('age')
    def validates_age_range(self, key, value):
        if value not in range(8, 19):
            raise ValueError("Campers must be between 8 and 18 years old.")
        return value

    def __repr__(self):
        return f'<Camper {self.id}: {self.name}>'


class Signup(db.Model, SerializerMixin):
    __tablename__ = 'signups'

    id = db.Column(db.Integer, primary_key=True)
    time = db.Column(db.Integer)
    camper_id = db.Column(db.Integer, db.ForeignKey("campers.id"))
    activity_id = db.Column(db.Integer, db.ForeignKey("activities.id"))

    @validates('time')
    def validates_time_range(self, key, value):
        if value not in range(0, 24):
            raise ValueError("Time must be a number between 0 and 23.")
        return value

    def __repr__(self):
        return f'<Signup {self.id}>'


# add any models you may need.
