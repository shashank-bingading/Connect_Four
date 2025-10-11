const gameService = require("../services/gameService");
//took me hours to figure this out lol
module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.on("joinGame", ({ gameId, player }) => {
      socket.join(gameId);
      const game = gameService.getGame(gameId);
      if (game) {
        io.to(socket.id).emit("gameUpdate", game.state);
      }
    });

    socket.on("makeMove", ({ gameId, colIndex, player }) => {
      const game = gameService.getGame(gameId);
      if (!game) return;

      if (gameService.applyMove(game, colIndex, player)) {
        io.to(gameId).emit("gameUpdate", game.state);
      }
    });

    socket.on("disconnect", () => {
      // don't know how to handle this yet
    });
  });
};
