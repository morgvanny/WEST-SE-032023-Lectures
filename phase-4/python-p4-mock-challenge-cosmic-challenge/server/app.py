#!/usr/bin/env python3

from flask import Flask, make_response, jsonify, request
from flask_migrate import Migrate
from flask_restful import Api, Resource

from models import db, Planet, Scientist, Mission

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)


@app.route('/')
def home():
    return ''


class Scientists(Resource):
    def get(self):
        scientists = [scientist.to_dict(only=("id", "name", "field_of_study", "avatar"))
                      for scientist in Scientist.query.all()]
        return make_response(jsonify(scientists), 200)

    def post(self):
        request_json = request.get_json()
        try:
            scientist = Scientist(name=request_json.get('name'), field_of_study=request_json.get(
                'field_of_study'), avatar=request_json.get('avatar'))
            db.session.add(scientist)
            db.session.commit()
            return make_response(jsonify(scientist.to_dict(only=("id", "name", "field_of_study", "avatar"))), 201)
        except Exception:
            return make_response(jsonify({"error": "Validation error."}), 400)


class ScientistById(Resource):
    def get(self, id):
        scientist = db.session.get(Scientist, id)
        if not scientist:
            return make_response(jsonify({"error": "Scientist not found"}), 404)
        return make_response(jsonify(scientist.to_dict()), 200)

    def patch(self, id):
        request_json = request.get_json()
        scientist = db.session.get(Scientist, id)
        if not scientist:
            return make_response(jsonify({"error": "Scientist not found"}), 404)
        try:
            for key, value in request_json.items():
                if hasattr(scientist, key):
                    setattr(scientist, key, value)

            db.session.commit()
            return make_response(jsonify(scientist.to_dict(only=("id", "name", "field_of_study", "avatar"))), 202)
        except Exception:
            return make_response(jsonify({"error": "Validation failed."}), 400)

    def delete(self, id):
        scientist = db.session.get(Scientist, id)
        if not scientist:
            return make_response(jsonify({"error": "Scientist not found"}), 404)
        db.session.delete(scientist)
        db.session.commit()
        return make_response({}, 204)


class Planets(Resource):
    def get(self):
        planets = [planet.to_dict(only=(
            "id", "name", "distance_from_earth", "nearest_star", "image")) for planet in Planet.query.all()]
        return make_response(jsonify(planets), 200)


class Missions(Resource):
    def post(self):
        request_json = request.get_json()
        try:
            mission = Mission(planet_id=request_json.get('planet_id'), scientist_id=request_json.get(
                'scientist_id'), name=request_json.get('name'))
            db.session.add(mission)
            db.session.commit()
            return make_response(jsonify(mission.planet.to_dict(only=(
                "id", "name", "distance_from_earth", "nearest_star", "image"))), 201)
        except Exception:
            return make_response(jsonify({"error": "Validation failed."}), 400)


api.add_resource(Missions, '/missions')
api.add_resource(Planets, "/planets")
api.add_resource(ScientistById, '/scientists/<int:id>')
api.add_resource(Scientists, '/scientists')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
