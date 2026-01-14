const { createGame } = require("../models/gameModel");
const games = {};

function newGame() {
  const id = Math.random().toString(36).substr(2, 6);
  games[id] = createGame(id);
  return games[id];
}

function getGame(id) {
  return games[id];
}

function joinGame(gameId, playerId) {
  const game = games[gameId];
  if (!game) return false;
  if (game.players.length >= 2) return false;

  if(game.players.includes(playerId)) return false;

  if (!game.playerColors) game.playerColors = {};
  const color = game.players.length === 0 ? "R" : "Y";
  game.playerColors[playerId] = color;
  game.players.push(playerId);

  if (game.players.length === 2) game.status = "playing";
  return true;
}

function move(gameId, colIndex, playerId) {
  const game = games[gameId];
  console.log("Attempting move:", {gameId, colIndex, playerId, game});
  if (!game || game.winner || game.status !== "playing") return false;
  if (game.playerColors[playerId] !== game.currentPlayer) return false;

  const newBoard = game.board.map((row) => row.slice());
  for (let row = 5; row >= 0; row--) {
    if (!newBoard[row][colIndex]) {
      newBoard[row][colIndex] = game.currentPlayer;
      games[gameId].board = newBoard;

      const winner = checkWinner(newBoard);
      if (winner) {
        games[gameId].winner = winner;
        games[gameId].status = "finished";
      } else {
        games[gameId].currentPlayer = game.currentPlayer === "R" ? "Y" : "R";
      }
      return true;
    }
  }
  return false;
}

function checkWinner(board) {
  const rows = board.length,
    cols = board[0].length;
  // Horizontal check
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols - 3; c++) {
      if (
        board[r][c] &&
        board[r][c] === board[r][c + 1] &&
        board[r][c] === board[r][c + 2] &&
        board[r][c] === board[r][c + 3]
      )
        return board[r][c];
    }
  }

  // Vertical check
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows - 3; r++) {
      if (
        board[r][c] &&
        board[r][c] === board[r + 1][c] &&
        board[r][c] === board[r + 2][c] &&
        board[r][c] === board[r + 3][c]
      )
        return board[r][c];
    }
  }

  // Diagonal
  for (let r = 0; r < rows - 3; r++) {
    for (let c = 0; c < cols - 3; c++) {
      if (
        board[r][c] &&
        board[r][c] === board[r + 1][c + 1] &&
        board[r][c] === board[r + 2][c + 2] &&
        board[r][c] === board[r + 3][c + 3]
      )
        return board[r][c];
    }
  }

  // Diagonal again (other direction)
  for (let r = 3; r < rows; r++) {
    for (let c = 0; c < cols - 3; c++) {
      if (
        board[r][c] &&
        board[r][c] === board[r - 1][c + 1] &&
        board[r][c] === board[r - 2][c + 2] &&
        board[r][c] === board[r - 3][c + 3]
      )
        return board[r][c];
    }
  }

  // Draw
  if (board.every((row) => row.every((cell) => cell))) return "Draw";

  return null;
}

module.exports = { newGame, getGame, joinGame, move };
