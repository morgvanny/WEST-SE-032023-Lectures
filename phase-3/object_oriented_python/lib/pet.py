#!/usr/bin/env python3
# Demonstrate classes
# 1. ✅ Create a Pet class
# 2. ✅ Instantiate a few pet instance
# Compare the pet instances to demonstrate they are not the same object
# Note: add 'pass' to the pet class

class Pet:
    def __init__(self, name, age, breed, temperament, image_url):
        self.name = name
        self.age = age
        self.breed = breed
        self.temperament = temperament
        self.image_url = image_url

    def print_details(self):
        print(f"Name: {self.name}")
        print(f"Age: {self.age}")
        print(f"Breed: {self.breed}")
        print(f"Temperament: {self.temperament}")
        print(f"Image Url: {self.image_url}")

    def one_more(self, arg):
        print(f"{self.name} is {arg}")
        # 3. ✅ Demonstrate __init__
        # Add arguments to instances
        # use dot notation to access their attributes
        # update attributes with new values

        # 4.✅ Demonstrate instance methods by creating a print_pet_details function that will print the pet attributes
        #     Review the self keyword
        #     Invoke the print_pet_details on an instance
        #           ->
        # name:rose
        # age:11
        # breed:domestic longhair
        # temperament:sweet
        # image_url:rose.jpg

        # Demonstrate instances
        # Different Instances are Different Objects
        # Demonstrate __init__
        # Demonstrate instance method
        # Demonstrate the self keyword
        # Stretch Goals
        # Demonstrate object properties

        # Instances

        # Run in ipdb session
        # rose == cookie
        #   False

        # Read Attributes
        # rose.name -> rose
        # rose.age -> 11

        # Update
        # rose.age -> 11
        # rose.age = 12
        # rose.age -> 12
