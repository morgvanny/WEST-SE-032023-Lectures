#!/usr/bin/env python3
# 📚 Review With Students:
# Set up:
from models import db, Production, CastMember, User
# cd into server and run the following in Terminal:
# export FLASK_APP=app.py
# export FLASK_RUN_PORT=5000
# flask db init
# flask db revision --autogenerate -m'Create tables'
# flask db upgrade
# python seed.py
# Running React Together
# In Terminal, run:
# `honcho start -f Procfile.dev`

from flask import Flask, request, make_response, session, jsonify, abort
from flask_migrate import Migrate
from flask_restful import Resource
from werkzeug.exceptions import NotFound, Unauthorized
from flask_cors import CORS
from config import app, db, api

# 1.✅ Import Bcrypt form flask_bcrypt
# 1.1 Invoke Bcrypt and pass it app


# 2.✅ Navigate to "models.py"
# Continue on Step 3


CORS(app)


class Productions(Resource):
    def get(self):
        production_list = [p.to_dict() for p in Production.query.all()]
        response = make_response(
            production_list,
            200,
        )

        return response

    def post(self):
        try:
            user = User.query.filter_by(id=session['user_id']).first()
        except:
            abort(401, "Unauthorized")
        form_json = request.get_json()
        try:
            new_production = Production(
                title=form_json.get('title'),
                genre=form_json.get('genre'),
                budget=int(form_json.get('budget')),
                image=form_json.get('image'),
                director=form_json.get('director'),
                description=form_json.get('description')
            )
        except ValueError as e:
            abort(422, e.args[0])

        db.session.add(new_production)
        db.session.commit()

        response_dict = new_production.to_dict()

        response = make_response(
            response_dict,
            201,
        )
        return response


api.add_resource(Productions, '/productions')


class ProductionByID(Resource):
    def get(self, id):
        production = Production.query.filter_by(id=id).first()
        if not production:
            raise NotFound
        production_dict = production.to_dict()
        response = make_response(
            production_dict,
            200
        )

        return response

    def patch(self, id):
        production = Production.query.filter_by(id=id).first()
        if not production:
            raise NotFound

        for attr in request.form:
            setattr(production, attr, request.form[attr])

        production.ongoing = bool(request.form['ongoing'])
        production.budget = int(request.form['budget'])

        db.session.add(production)
        db.session.commit()

        production_dict = production.to_dict()

        response = make_response(
            production_dict,
            200
        )
        return response

    def delete(self, id):
        production = Production.query.filter_by(id=id).first()
        if not production:
            raise NotFound
        db.session.delete(production)
        db.session.commit()

        response = make_response('', 204)

        return response


api.add_resource(ProductionByID, '/productions/<int:id>')

# 14.✅ Create a Signup route


class Signup(Resource):
    def post(self):
        form_json = request.get_json()
        new_user = User(name=form_json['name'], email=form_json['email'])
        # Hashes our password and saves it to _password_hash
        new_user.password_hash = form_json['password']

        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id
        response = make_response(
            new_user.to_dict(),
            201
        )
        return response


api.add_resource(Signup, '/signup')

# User.query.order_by(User.id.desc()).first()._password_hash

# 15.✅ Create a Login route


class Login(Resource):
    def post(self):
        try:
            user = User.query.filter_by(
                name=request.get_json()['name']).first()

            if user.authenticate(request.get_json()['password']):
                session['user_id'] = user.id
                response = make_response(
                    user.to_dict(),
                    200
                )
                return response
            else:
                abort(401, "Incorrect Username or Password")
        except:
            abort(401, "Incorrect Username or Password")


api.add_resource(Login, '/login')
# 16.✅ Create a route that checks to see if the User is currently in sessions
# 16.1 Use add_resource to add an authorized endpoint
# 16.2 Create a Get method
# 16.2.1 Check to see if the user_id is in session
# 16.2.2 If found query the user and send it to the client
# 16.2.3 If not found return a 401 Unauthorized error


class AuthorizedSession(Resource):
    def get(self):
        try:

            user = User.query.filter_by(id=session['user_id']).first()
            response = make_response(
                user.to_dict(),
                200
            )
            return response
        except:
            abort(401, "Unauthorized")


api.add_resource(AuthorizedSession, '/authorized')

# 17.✅ Create a Logout route
# 17.1 Use add_resource to add a logout endpoint
# 17.2 Create a delete method
# 8.2.1 Set the user_id in sessions to None
# 8.2.1 Create a response with no content and a 204
# 17.3 Test out your route with the client or Postman

# 18.✅ Navigate to client navigation


class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        response = make_response('', 204)
        return response


api.add_resource(Logout, '/logout')


@app.errorhandler(NotFound)
def handle_not_found(e):
    response = make_response(
        "Not Found: Sorry the resource you are looking for does not exist",
        404
    )

    return response


if __name__ == '__main__':
    app.run(port=5000, debug=True)
