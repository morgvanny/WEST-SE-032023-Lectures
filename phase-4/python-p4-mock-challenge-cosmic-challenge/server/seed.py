from random import randint, choice as rc

from faker import Faker

from app import app
from models import db, Planet, Scientist, Mission

fake = Faker()


def create_planets():
    planets = []
    for _ in range(25):
        planet = Planet(
            name=fake.name(),
            distance_from_earth=fake.name(),
            nearest_star=fake.name(),
            image=fake.sentence(),
        )
        planets.append(planet)
    return planets


def create_scientists():
    scientists = []
    for _ in range(100):
        scientist = Scientist(
            name=fake.name(),
            field_of_study=fake.name(),
            avatar=fake.name(),
        )
        scientists.append(scientist)
    return scientists


def create_missions(planets, scientists):

    for _ in range(3000):
        mission = Mission(
            name=fake.name(),
            planet_id=rc([planet.id for planet in planets]),
            scientist_id=rc([scientist.id for scientist in scientists]),
        )
        db.session.add(mission)
        try:
            db.session.commit()
        except Exception:
            db.session.rollback()


if __name__ == "__main__":
    with app.app_context():
        print("Clearing db...")
        Planet.query.delete()
        Scientist.query.delete()
        Mission.query.delete()

        print("Seeding planets...")
        planets = create_planets()
        db.session.add_all(planets)
        db.session.commit()

        print("Seeding scientists...")
        scientists = create_scientists()
        db.session.add_all(scientists)
        db.session.commit()

        print("Seeding missions...")
        missions = create_missions(planets, scientists)
        print("Done seeding!")
