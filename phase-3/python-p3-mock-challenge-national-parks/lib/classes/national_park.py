from statistics import mode


class NationalPark:

    def __init__(self, name):
        if isinstance(name, str):
            self._name = name
        else:
            raise Exception
        self._trips = []
        self._visitors = []

    @property
    def name(self):
        return self._name

    # @name.setter
    # def name(self, name):
    #     if isinstance(name, str) and not hasattr(self, "_name"):
    #         self._name = name
    #     else:
    #         raise Exception

    def trips(self):
        from classes.trip import Trip
        return [t for t in Trip.all if t.national_park == self]

    def visitors(self):
        return list(set([t.visitor for t in self.trips()]))

    def total_visits(self):
        return len(self.trips())

    def best_visitor(self):
        # visitors = self.visitors()
        # return max(visitors, key=lambda v: v.times_visited(self))

        # visitors = [t.visitor for t in self.trips()]
        # return mode(visitors)

        visitors = [t.visitor for t in self.trips()]
        return max(visitors, key=visitors.count)
