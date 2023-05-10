import ipdb
from operator import itemgetter


class Player:

    all = []

    def __init__(self, username):
        self.username = username
        self.all.append(self)

    @property
    def username(self):
        return self._username

    @username.setter
    def username(self, username):
        if isinstance(username, str) and len(username) in range(2, 17):
            self._username = username
        else:
            raise Exception(
                "Username must be a string with length between 2 and 16.")

    def results(self):
        from classes.result import Result
        return [r for r in Result.all if r.player == self]

    def games_played(self):
        return list(set([r.game for r in self.results()]))

    def played_game(self, game):
        return game in self.games_played()

    def num_times_played(self, game):
        results = self.results()
        results_for_game = [r for r in results if r.game == game]
        return len(results_for_game)

    @classmethod
    def highest_scored(cls, game):
        def player_score(player):
            return game.average_score(player)

        return max(cls.all, key=player_score)

        # player_averages = [(player, game.average_score(player))
        #                    for player in cls.all]
        # return max(player_averages, key=itemgetter(1))[0]

        # return max(cls.all, key=lambda player: game.average_score(player))

        # max_player = None
        # max_score = 0

        # for player in cls.all:
        #     score = game.average_score(player)
        #     if score > max_score:
        #         max_player = player
        #         max_score = score
        # return max_player
