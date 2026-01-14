const gameService = require("../services/gameService");

module.exports = (io) => {
  io.on("connection", (socket) => {
    
    socket.on("joinGameRoom", ({ gameId, playerId }) => {
      const game = gameService.getGame(gameId);
      if (!game) return;

      // Using the service to handle all game logic
      gameService.joinGame(gameId, playerId);

      // Joining the room
      socket.join(gameId);

      // Telling EVERYONE in the room to update
      // We send the whole game object (which now includes playerColors)
      io.to(gameId).emit("gameUpdate", game);
    });

    socket.on("makeMove", ({ gameId, colIndex, playerId }) => {
      const moved = gameService.move(gameId, colIndex, playerId);
      if (moved) {
        const game = gameService.getGame(gameId);
        // Just broadcasting the new state to the room here nothing much 
        io.to(gameId).emit("gameUpdate", game);
      }
    });
  });
};
