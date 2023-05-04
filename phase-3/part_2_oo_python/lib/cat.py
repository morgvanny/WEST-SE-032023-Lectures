from lib.pet import Pet

# 6✅. Create a subclass of Pet called Cat
# import Pet from lib.pet
# Update the instance in debug.py to rose = Cat('rose', 11, 'domestic longhair', 'sweet', 'rose.jpg', True)

# 8✅. Create __init__ that takes all the parameters from Pet and a parameter called indoor
# Use super to pass the Pet parameters to the super class
# Add an indoor attribute

# 7✅. Create a method unique to the Cat subclass called talk which returns the string "Meowwwwwww"

# 9✅. Stretch: Create a method called print_pet_details, to match the print_pet_details in Pet
# Add super().print_pet_details() and print the indoor attribute


class Cat(Pet):

    def __init__(self, name, age, breed, temperament, image_url, indoor):
        super().__init__(name, age, breed, temperament, image_url)
        self.indoor = indoor

    def print_pet_details(self):
        super().print_pet_details()
        print(f'indoor: {self.indoor}')

    def talk(self):
        print("meowwww")


class TalkingCat(Cat):

    def __init__(self, name, age, breed, temperament, image_url, indoor):
        super().__init__(name, age, breed, temperament, image_url, indoor)
        self.status = "satisfied"

    def talk(self):
        print("Hi, I'm a talking cat!")
