from faker import Faker
import random

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from models import (Pet, Owner, Handler, Job)

if __name__ == '__main__':
    engine = create_engine('sqlite:///pet_app.db')
    Session = sessionmaker(bind=engine)
    session = Session()
# 2.a ✅ Add delete methods for Pet and Owner to clear the database before each seeding

    session.query(Pet).delete()
    session.query(Owner).delete()
# ----------
# 5.✅ Add Delete methods for Job and Handler

    # Initialize faker

    fake = Faker()

    # Create an array for species with "CAT" and "Dog"

    species = ["Cat", "Dog"]

    # Create an array of cat breeds

    cat_breeds = ["Siamese", "Sphynx", "Burmese",
                  "Domestic long hair", "Domestic short hair"]

    # Create an array of dog breeds

    dog_breeds = ["Husky", "Poodle", "Chihuahua",
                  "Corgi", "Australian Shepherd", "Bulldog"]

    # Create an array of temperaments
    temperaments = ["Happy", "Calm", "Excited", "Aggressive", "Nervous"]
    # Create an empty array for owners
    owners = []
    pets = []
    # Create a for loop that iterates 50 times
    for _ in range(50):
        owner = Owner(
            name=f"{fake.first_name()} {fake.last_name()}",
            email=fake.email(),
            phone=random.randint(1000000, 9999999),
            address=fake.address()
        )
    # Create an owner using data from faker
        session.add(owner)
        session.commit()
        owners.append(owner)

    # Use .add and .commit to save the owner one at a time, so we maintain the owner ID in our instance.

    # Append the owner to the owners array

    # Create an empty pets array

    for owner in owners:
        for _ in range(random.randint(1, 3)):
            species = random.choice(species)
            pet = Pet(
                name=fake.name(),
                species=species,
                breed=random.choice(
                    cat_breeds) if species == "Cat" else random.choice(dog_breeds),
                temperament=random.choice(temperaments),
                owner_id=owner.id
            )
            session.add(pet)
            session.commit()
            pets.append(pet)

    # Create a for loop that iterates over the owners array

    # Create a for loop that iterates 1 - 3 times

    # Use faker and the species, cat breeds, dog breeds and temperament array to create a pet

    # Use .add and .commit to save the pet to the database

    # Append the pet to the pets array

# 3✅ run the seed file and head over to debug.py to test out your one to many
# -----------------------------------------------------

# 5.✅ Create a empty array set to handlers
    handlers = []

    # Create a for loop that iterates 50 times

    for _ in range(50):
        handler = Handler(
            name=f"{fake.first_name()} {fake.last_name()}",
            email=fake.email(),
            phone=random.randint(1000000, 9999999),
            hourly_rate=random.uniform(20.50, 50.50)
        )
        session.add(handler)
        session.commit()

        handlers.append(handler)

    # Create a handler with faker data

    # Use .add and .commit to save the handler to the database

    # Append handler to handlers

    # Create an array of requests, "Walk", "Drop-in" and "Boarding"
    requests = ["Walk", "Drop-in", "Boarding"]

    # Create an empty array and set it to jobs

    jobs = []

    # Create a for loop that iterates over the handlers array
    for handler in handlers:
        for _ in range(random.randint(1, 10)):
            job = Job(
                request=random.choice(requests),
                date=fake.date_this_year(),
                fee=handler.hourly_rate,
                handler_id=handler.id,
                pet_id=random.choice(pets).id
            )
            jobs.append(job)
    session.bulk_save_objects(jobs)

    # Create a for loop that iterates 1 - 10 times

    # Create a Job using faker, the request array and pets array

    # append the job to the jobs array

    # Bulk save the jobs (we wont need their id)

    session.commit()
    session.close()

# 6.✅ Run the seeds file and head over to debug.py to test out your Many to Many
