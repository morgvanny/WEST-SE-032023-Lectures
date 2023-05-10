from statistics import mean


class Game:
    def __init__(self, title):
        if isinstance(title, str) and title:
            self._title = title
        else:
            raise Exception(
                "Title must be a string with more than 0 characters.")

    @property
    def title(self):
        return self._title

    def results(self):
        from classes.result import Result
        return [r for r in Result.all if r.game == self]

    def players(self):
        return list(set([r.player for r in self.results()]))

    def average_score(self, player):
        scores = [r.score for r in self.results() if r.player == player]
        if len(scores) > 0:
            return mean(scores)
        else:
            return 0
