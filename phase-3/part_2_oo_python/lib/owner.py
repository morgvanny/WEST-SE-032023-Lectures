class Owner:

    def __init__(self, name):
        self.name = name

    @property
    def pets(self):
        from lib.pet import Pet
        return [pet for pet in Pet.pets if pet.owner == self]

    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, name):

        approved_names = ["Morgan", "James", "Kate"]
        if isinstance(name, str) and name in approved_names:
            self._name = name
        else:
            raise Exception("Name must be Morgan, James, or Kate")
