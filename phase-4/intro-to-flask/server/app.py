#!/usr/bin/env python3

from flask import Flask, jsonify, make_response, request
from flask_migrate import Migrate
from models import db, Production
# 📚 Review With Students:
# Request-Response Cycle
# Web Servers and WSGI/Werkzeug

# 1. ✅ Navigate to `models.py`

# 2. ✅ Set Up Imports


# 3. ✅ Initialize the App
app = Flask(__name__)
# Configure the database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

migrate = Migrate(app, db)

db.init_app(app)

# 4. ✅ Migrate

# 5. ✅ Navigate to `seed.rb`

# 6. ✅ Routes


# 7. ✅ Run the server with `flask run` and verify your route in the browser at `http://localhost:5000/`

# 8. ✅ Create a dynamic route

@app.route('/')
def index():
    return '<h1>Productions App</h1>'
# 9.✅ Update the route to find a `production` by its `title` and send it to our browser


@app.route('/whatever')
def whatever():
    return "<p>You've reached the whatever page</p>"


@app.route('/fake-production')
def fake_production():
    production_response = {
        "title": "Wicked",
        "genre": "Fantasy"
    }

    response = make_response(jsonify(production_response), 200)

    return response


@app.route('/productions')
def productions():
    production_response = [{"id": production.id, "title": production.title,
                            "genre": production.director, "director": production.director,
                            "description": production.description,
                            "budget": production.budget, "image": production.image,
                            "ongoing": production.ongoing, "created_at": production.created_at,
                            "updated_at": production.updated_at} for production in Production.query.all()]
    response = make_response(jsonify(production_response), 200)
    return response


@app.route('/productions/<string:id>')
def production(id):
    production = Production.query.filter(Production.id == id).first()
    production_response = {"id": production.id, "title": production.title,
                           "genre": production.director, "director": production.director,
                           "description": production.description,
                           "budget": production.budget, "image": production.image,
                           "ongoing": production.ongoing, "created_at": production.created_at,
                           "updated_at": production.updated_at}
    return make_response(jsonify(production_response), 200)

# Note: If you'd like to run the application as a script instead of using `flask run`, uncomment the line below
# and run `python app.py`

# if __name__ == '__main__':
#     app.run(port=5000, debug=True)
