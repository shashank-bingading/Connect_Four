const gameService = require("../services/gameService");

module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.on("joinGameRoom", ({ gameId, playerId }) => {
      const game = gameService.getGame(gameId);
      if (!game) return;

      if (!game.socketIds) game.socketIds = {};
      if (!game.playerColors) game.playerColors = {};

      if (!game.players.includes(playerId) && game.players.length < 2) {
        gameService.joinGame(gameId, playerId);

        const color = game.players.length === 1 ? "R" : "Y";
        game.playerColors[playerId] = color;

        game.socketIds[playerId] = socket.id;
      }

      socket.join(gameId);

      game.players.forEach((pid) => {
        const sid = game.socketIds[pid];
        if (sid) {
          io.to(sid).emit("gameUpdate", {
            ...game,
            playerColor: game.playerColors[pid],
          });
        }
      });
    });

    socket.on("makeMove", ({ gameId, colIndex, playerId }) => {
      const moved = gameService.move(gameId, colIndex, playerId);
      const game = gameService.getGame(gameId);

      if (moved && game) {
        game.players.forEach((pid) => {
          const sid = game.socketIds[pid];
          if (sid) {
            io.to(sid).emit("gameUpdate", {
              ...game,
              playerColor: game.playerColors[pid],
            });
          }
        });
      }
    });

    socket.on("disconnect", () => {
      // I did not do anything special on disconnect (yet)
      //Encountered a lot of bugs and didn't have time so will do this later
    });
  });
};
