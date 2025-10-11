const gameService = require('../services/gameService');

//used the same flow I used in my other projects....

const createGame = (req, res) => {
  const newGame = gameService.createGame();
  res.json({ gameId: newGame.id });
};

const joinGame = (req, res) => {
  const gameId = req.params.id;
  const game = gameService.getGame(gameId);
  if (game) {
    res.json({ gameId, state: game.state });
  } else {
    res.status(404).json({ error: 'Game not found' });
  }
};

module.exports = { createGame, joinGame };
