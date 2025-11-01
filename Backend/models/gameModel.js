function createGame(gameId) {
  return {
    id: gameId,
    board: Array(6)
      .fill(null)
      .map(() => Array(7).fill(null)),
    players: [],
    currentPlayer: "R",
    winner: null,
    status: "waiting",
  };
}

module.exports = { createGame };
