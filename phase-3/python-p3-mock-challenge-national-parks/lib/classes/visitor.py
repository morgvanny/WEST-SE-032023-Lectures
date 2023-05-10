class Visitor:

    def __init__(self, name):
        if isinstance(name, str):
            self._name = name
        else:
            raise Exception

    @property
    def name(self):
        return self._name

    def trips(self):
        from classes.trip import Trip
        return [t for t in Trip.all if t.visitor == self]

    def national_parks(self):
        return list(set([trip.national_park for trip in self.trips()]))

    def times_visited(self, park):
        return len([t for t in self.trips() if t.national_park == park])
