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
        self._owner = None

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

    # def get_name(self):
    #     return self._name

    # def set_name(self, name):
    #     if isinstance(name, str):
    #         self._name = name
    #     else:
    #         raise Exception("Name must be a string")

    # name = property(get_name, set_name)

    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, name):
        if isinstance(name, str):
            self._name = name
        else:
            raise Exception("Name must be a string")

    @property
    def owner(self):
        return self._owner

    @owner.setter
    def owner(self, owner):
        from lib.owner import Owner
        if isinstance(owner, Owner):
            self._owner = owner
        else:
            raise Exception("The pet's owner must be an isntance of Owner")
