class Result:

    all = []

    def __init__(self, player, game, score):
        self.player = player
        self.game = game
        self.score = score
        self.all.append(self)

    @property
    def score(self):
        return self._score

    @score.setter
    def score(self, score):
        if isinstance(score, int) and score in range(1, 5001):
            self._score = score
        else:
            raise Exception("Score must be an integer between 1 and 5000.")

    @property
    def player(self):
        return self._player

    @player.setter
    def player(self, player):
        from classes.player import Player
        if isinstance(player, Player):
            self._player = player
        else:
            raise Exception("A result's player must be a player instance.")

    @property
    def game(self):
        return self._game

    @game.setter
    def game(self, game):
        from classes.game import Game
        if isinstance(game, Game):
            self._game = game
        else:
            raise Exception("A result's game must be a game instance.")
