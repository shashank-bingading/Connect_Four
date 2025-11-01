const gameService = require("../services/gameService");

const createGame = (req, res) => {
  const game = gameService.newGame();
  res.json({ gameId: game.id });
};

const joinGame = (req, res) => {
  const { gameId, playerId } = req.body;
  const success = gameService.joinGame(gameId, playerId);
  if (success) res.json({ success: true });
  else res.status(400).json({ success: false });
};

module.exports = { createGame, joinGame };
