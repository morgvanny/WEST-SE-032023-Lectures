#!/usr/bin/env python3

import ipdb
from lib.pet import *


some_pet = Pet("rose", 2, "husky", "tired", "3209.jpg")
another_pet = Pet("jim", 6, 'poodle', 'excited', '131.jpg')

some_pet.print_details()


ipdb.set_trace()
