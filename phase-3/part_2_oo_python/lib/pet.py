#!/usr/bin/env python3
# Class Attributes and Methods
import ipdb


class Pet:

    total = 0
    pets = []

    def __init__(self, name, age, breed, temperament, image_url):
        self.name = name
        self.age = age
        self.breed = breed
        self.temperament = temperament
        self.image_url = image_url
        self.status = "hungry"
        self.increase_total()
        self.pets.append(self)

    # 6✅. Create a class method increase_pets that will increment total_pets
        # replace Pet.total_pets += 1 in __init__ with increase_pets()

    @classmethod
    def increase_total(cls, amt=1):
        cls.total += amt

    @classmethod
    def feed_all(cls):
        for pet in cls.pets:
            pet.feed()

    def feed(self):
        self.status = "satisfied"
        print(f'{self.name} was fed and is now {self.status}!')

    def print_pet_details(self):
        print(f'''
            name:{self.name}
            age:{self.age}
            breed:{self.breed}
            temperament:{self.temperament}
            image_url:{self.image_url}
        ''')
