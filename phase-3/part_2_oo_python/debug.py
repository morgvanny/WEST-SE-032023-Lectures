#!/usr/bin/env python3
# 📚 Review With Students:
import ipdb
# Introduction to Object Oriented programming, classes, instances, methods

# Importing the pet class
from lib.pet import *
from lib.cat import *
from lib.owner import *

# Instances of the pet classes
# rose = Cat('rose', 11, 'domestic longhair', 'sweet', 'rose.jpg', True)
cookie = Pet('cookie', 1, 'Dachshund', 'hyper', 'cookie.jpg')
cookie_2 = Pet('cookie_2', 1, 'Dachshund', 'hyper', 'cookie.jpg')
cookie_3 = Pet('cookie_3', 1, 'Dachshund', 'hyper', 'cookie.jpg')
# princess_grace = Cat('princess grace', 7,
#  'domestic longhair', 'affectionate', 'gracy.png', True)

morgan = Owner("Morgan")

cookie.owner = morgan

cookie_3.owner = morgan

ipdb.set_trace()
