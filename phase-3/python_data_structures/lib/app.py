#!/usr/bin/env python3
# Sequence Types
# Note: use print() to execute the examples. Comment out examples after they've been demoed.

# Creating Lists
# 1. ✅ Create a list of 10 pet names
pet_names = ['Rose', 'Meow Meow Beans', 'Mr.Legumes', 'Luke',
             'Lea', 'Princess Grace', 'Spot', 'Tom', 'Mini', 'Paul']
# Reading Information From Lists
# 2. ✅ Return the first pet name
# print(pet_names[0])

# 3. ✅ Return all pet names beginning from the 3rd index
# print(pet_names[3:])

# 4. ✅ Return all pet names before the 3rd index
# print(pet_names[:3])

# 5. ✅  Return all pet names beginning from the 3rd index and up to the 7th
# print(pet_names[3:8])


# 6. ✅ Find the index of a given element
# print(pet_names.index("Tom"))

# 7. ✅ Reverse the original list
# pet_names.reverse()
# print(pet_names)

# 8. ✅ Return the frequency of a given element
nums = [1, 2, 3, 2, 2, 5, 6, 2]

# print(nums.count(2))

# Updating Lists
# 9. ✅ Change the first element to all uppercase
# pet_names[0] = pet_names[0].upper()

# 10. ✅ Append a new name to the list
# pet_names = pet_names.append("Bob")
# 11. ✅ Add a new name at a specific index
# pet_names.insert(1, "Bob")

# 12. ✅ Add two lists together

new_list = [1, 2] + [2, 3, 4]

# 13. ✅ Remove the final element from the list

# print(new_list.pop())

# print(new_list)
# 14. ✅ Remove element by specific index
# del new_list[2]
# new_list.pop(2)
# print(new_list)
# 15. ✅ Remove a specific element
# new_list.remove(2)
# print(new_list)
# 16. ✅ Remove all pet names from the list
# pet_names.clear()
# del pet_names
# print(pet_names)

# Tuple
# 📚 Review With Students:
# Mutable, Immutable

# 17. ✅ Create a Tuple of 10 pet ages
ages = (1, 3, 5, 2, 3, 9, 11, 4, 6, 9)
# print(ages)
# 18. ✅ Print the first pet age
# print(ages[0])

# Testing Changeability
# 19. ✅ Attempt to remove an element with ".pop" (should error)
# ages.pop()

# 20. ✅ Attempt to change the first element (should error)
# ages[0] = 15

# Tuple Methods
# 21. ✅ Return the frequency of a given element
# print(ages.count(9))

# 22. ✅ Return the index of a given element
# print(ages.index(9))

# 23. ✅ Create a Range
# Note:  Ranges are primarily used in loops
# r = range(1, 14, 3)
# print(r)
# for i in r:
#     print(i)
# Demo Sets (Stretch Goal)
# 24. ✅ Create a set of 3 pet foods
food_set = {"cheese", "berries", "bacon"}
# print(type(food_set))
# Demo Dictionaries
# Creating
# 25. ✅  Create a dictionary of pet information with the keys "name", "age" and "breed"
pet_info_rose = {'name': 'rose', 'age': 11, 'breed': 'domestic long '}


# 26. ✅  Use dict to create a dictionary of pet information with the keys "name", "age" and "breed"
pet_info_spot = dict(name='Spot', age=25, breed='boxer')

# print(pet_info_spot)
# Reading
# 27. ✅ Print the pet attribute of "name" using bracket notation
# print(pet_info_spot['name'])

# 28. ✅ Print the pet attribute of "age" using ".get"
# Note: ".get" is preferred over bracket notation in most cases because it will return "None" instead of an error
# print(pet_info_spot.get('age'))

# Updating
# 29. ✅ Update the pets age to 12
pet_info_spot['age'] = 12
# print(pet_info_spot)
# 30. ✅ Update the other pets age to 26

pet_info_rose['age'] = 26
# print(pet_info_rose)
# Deleting
# 30. ✅ Delete a pets age using the "del" keyword

del pet_info_rose['age']
# print(pet_info_rose)

# 31. ✅ Delete the other pets age using ".pop"

pet_info_spot.pop('age')
# print(pet_info_spot)

# 32. ✅ Delete the last item in the pet dictionary using "popitem()"
pet_info_spot.popitem()
# print(pet_info_spot)

# Demo Loops
pet_info = [
    {
        'name': 'rose',
        'age': 11,
        'breed': 'domestic long-haired',
    },
    {
        'name': 'spot',
        'age': 25,
        'breed': 'boxer',
    },
    {
        'name': 'Meow Meow Beans',
        'age': 2,
        'breed': 'domestic long-haired',
    }
]

# 33. ✅ Loop through a range of 10 and print every number within the range
# for i in range(10):
#     print(i)

# 34. ✅ Loop through a range between 50 and 60 that iterates by 2 and print every number
# for i in range(50, 60, 2):
#     print(i)

# 35. ✅ Loop through the "pet_info" list and print every dictionary
# for d in pet_info:
#     print(d)

# 36. ✅ Create a function that takes a list as an argument
# The function should use a "for" loop to loop through the list and print every item
# Invoke the function and pass it "pet_names" as an argument


def print_items(l):
    for i in l:
        print(i)


# print_items(pet_info)

# 37. ✅ Create a function that takes a list as an argument. (simple example)
# The function should define a counter and set it to 0
# Create a "while" loop
# The loop will continue as long as the counter is less than the length of the list
# Every loop should increase the count by 1
# Return the counter

def counting(l):
    counter = 0
    while counter < len(l):
        counter += 1
    return counter


# print(counting([1, 1, 3, 4]))

# 38. ✅ Create a function that updates the age of a given pet
# The function should take a list of "dict"s, "name" and "age" as parameters
# Create an index variable and set it to 0
# Create a while loop
# The loop will continue so long as the list does not contain a name matching the "name" param and the index is less then the length of the list
# Every list will increase the index by 1
# If the dict containing a matching name is found, update the item's age with the new age
# Otherwise, return 'pet not found'

def update_age(pets, name, age):
    i = 0
    while i < len(pets) and pets[i]['name'] != name:
        i += 1
    if i < len(pets):
        pets[i]['age'] = age
        return pets[i]
    else:
        return 'pet not found'


# print(update_age(pet_info, 'rose', 10))


# map like
# 39. ✅ Use list comprehension to return a list containing every pet name from "pet_info" changed to uppercase
names = [pet.get('name').upper() for pet in pet_info]

# print(names)

# find like
# 40. ✅ Use list comprehension to find a pet named spot

spot = [pet for pet in pet_info if pet.get('name') == 'spot'][0]

# print(spot)

# filter like
# 41. ✅ Use list comprehension to find all of the pets under 3 years old

# young_pets = [pet for pet in pet_info if pet.get('age') < 3]

# print(young_pets)

# 43. ✅ Create a generator expression matching the filter above. Compare and contrast the generator to the list comprehension.

young_pets_generator = (pet for pet in pet_info if pet.get('age') < 3)

# print(young_pets_generator)

# for i in young_pets_generator:
#     print(i.get('name'))


pen = {'color': 'red'}

pen['color']  # => 'red'
pen.get('color')  # => 'red'

# pen['age']  # exception thrown, program crashes
pen.get('age')  # => None

if pen.get('age'):
    pen.get('age') > 10
