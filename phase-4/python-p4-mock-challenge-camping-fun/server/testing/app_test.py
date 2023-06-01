import json
import os
os.environ['DB_URI'] = "sqlite:///:memory:"

from flask import request

from app import app, db
from models import Activity, Signup, Camper

class TestApp:
    '''Flask application in app.py'''

    def test_gets_campers(self):
        '''retrieves campers with GET requests to /campers.'''

        with app.app_context():

            db.create_all()
            
            clark = Camper(name="Clark Kent", age=9)
            db.session.add(clark)
            db.session.commit()

            response = app.test_client().get('/campers').json
            campers = Camper.query.all()
            assert [camper['id'] for camper in response] == [camper.id for camper in campers]
            assert [camper['name'] for camper in response] == [camper.name for camper in campers]
            assert [camper['age'] for camper in response] == [camper.age for camper in campers]


    def test_gets_camper_by_id(self):
        '''retrieves one camper using its ID with GET request to /campers/<int:id>.'''

        with app.app_context():
            bruce = Camper(name="Bruce Wayne", age=11)
            db.session.add(bruce)
            db.session.commit()

            response = app.test_client().get(f'/campers/{bruce.id}').json
            assert response['name'] == bruce.name
            assert response['age'] == bruce.age

    def test_returns_404_if_no_camper(self):
        '''returns an error message and 404 status code when a camper is searched by a non-existent ID.'''
        
        with app.app_context():
            Camper.query.delete()
            db.session.commit()

            response = app.test_client().get('/campers/1')
            assert response.json.get('error')
            assert response.status_code == 404

    def test_creates_camper(self):
        '''creates one camper using a name and age with a POST request to /campers.'''

        with app.app_context():
            Camper.query.delete()
            db.session.commit()

            response = app.test_client().post(
                '/campers',
                json={
                    'name': 'Tony Stark',
                    'age': 15
                }
            ).json

            assert response['id']
            assert response['name'] == 'Tony Stark'
            assert response['age'] == 15

            tony = Camper.query.filter(Camper.name=='Tony Stark', Camper.age==15).one_or_none()
            assert tony

    def test_400_for_camper_validation_error(self):
        '''returns a 400 status code and error message if a POST request to /campers fails.'''

        with app.app_context():

            response = app.test_client().post(
                '/campers',
                json={
                    'name': 'Tony Stark',
                    'age': 19
                }
            )

            assert response.status_code == 400
            assert response.json['error']

            response = app.test_client().post(
                'campers',
                json={
                    'name': '',
                    'age': 10
                }
            )

            assert response.status_code == 400
            assert response.json['error']

    def test_gets_activities(self):
        '''retrieves activities with GET request to /activities'''

        with app.app_context():
            activity = Activity(name="Swimming", difficulty="4")
            db.session.add(activity)
            db.session.commit()

            response = app.test_client().get('/activities').json
            activities = Activity.query.all()

            assert [activity['id'] for activity in response] == [activity.id for activity in activities]
            assert [activity['name'] for activity in response] == [activity.name for activity in activities]
            assert [activity['difficulty'] for activity in response] == [activity.difficulty for activity in activities]

    def test_deletes_activities_by_id(self):
        '''deletes activities with DELETE request to /activities/<int:id>.'''

        with app.app_context():
            activity = Activity(name="Fire Building", difficulty="5")
            db.session.add(activity)
            db.session.commit()

            response = app.test_client().delete(f'/activities/{activity.id}')

            assert response.status_code == 204

            activity = Activity.query.filter(Activity.id == activity.id).one_or_none()
            assert not activity

    def test_returns_404_if_no_activity(self):
        '''returns 404 status code with DELETE request to /activities/<int:id> if activity does not exist.'''

        with app.app_context():
            Activity.query.delete()
            db.session.commit()

            response = app.test_client().delete('/activities/1')
            assert response.json.get('error')
            assert response.status_code == 404


    def test_creates_signups(self):
        '''creates signups with POST request to /signups'''

        with app.app_context():
            peter = Camper(name="Peter Parker", age=18)
            canoeing = Activity(name="Canoeing", difficulty=1)
            db.session.add_all([peter, canoeing])
            db.session.commit()

            response = app.test_client().post(
                '/signups',
                json={
                    'time': 12,
                    'camper_id': peter.id,
                    'activity_id': canoeing.id
                }
            ).json

            assert response['id']
            assert response['time'] == 12
            assert response['camper_id'] == peter.id
            assert response['activity_id'] == canoeing.id

            signup = Signup.query.filter(Signup.id == response['id']).one_or_none()
            assert signup

    def test_400_for_signup_validation_error(self):
        '''returns a 400 status code and error message if a POST request to /signups fails.'''

        with app.app_context():
            peter = Camper(name="Peter Parker", age=18)
            canoeing = Activity(name="Canoeing", difficulty=1)
            db.session.add_all([peter, canoeing])
            db.session.commit()

            response = app.test_client().post(
                '/signups',
                json={
                    'time': 24,
                    'camper_id': peter.id,
                    'activity_id': canoeing.id
                }
            )

            assert response.status_code == 400
            assert response.json['error']