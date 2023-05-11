#!/usr/bin/env python3

import ipdb
# from owner import Owner, CONN, CURSOR
from pet import Pet, CONN, CURSOR

sql = """
    DROP TABLE IF EXISTS pets
"""

CURSOR.execute(sql)

# Owner.create_table()
# frank = Owner("frank", "555-555-5555", "frank@gmail.com", "555 Somewhere St.")
# frank.save()

# Pet.create_table()
# spot = Pet("spot", "dog", "chihuahua", "feisty", 1)
# spot.save()

ipdb.set_trace()
