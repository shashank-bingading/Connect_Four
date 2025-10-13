import React from "react";
import "../styles/board.css";
import { useState, useEffect } from "react";

const Board = () => {
  const rows = 6;
  const cols = 7;
  const [board, setBoard] = useState(
    Array(rows)
      .fill(null)
      .map(() => Array(cols).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState("R");

  const [winner, setWinner] = useState(null);
  useEffect(() => {
    const win = checkWinner(board);
    if (win) {
      setWinner(win);
    }
  }, [board]);

  const handleClickCell = (colIndex) => {
    if (winner) return;
    for (let row = rows - 1; row >= 0; row--) {
      if (!board[row][colIndex]) {
        const newBoard = board.map((ro) => [...ro]);
        newBoard[row][colIndex] = currentPlayer;
        setBoard(newBoard);
        setCurrentPlayer(currentPlayer === "R" ? "Y" : "R");
        break;
      }
    }
  };
  function checkWinner(board) {
    // Check horizontal
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols - 3; col++) {
        if (
          board[row][col] &&
          board[row][col] === board[row][col + 1] &&
          board[row][col] === board[row][col + 2] &&
          board[row][col] === board[row][col + 3]
        ) {
          return board[row][col];
        }
      }
    }
    // Check vertical
    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows - 3; row++) {
        if (
          board[row][col] &&
          board[row][col] === board[row + 1][col] &&
          board[row][col] === board[row + 2][col] &&
          board[row][col] === board[row + 3][col]
        ) {
          return board[row][col];
        }
      }
    }
    //Checking Diagonal down right
    for (let row = 3; row < rows; row++) {
      for (let col = 0; col < cols - 3; col++) {
        if (
          board[row][col] &&
          board[row][col] === board[row - 1][col + 1] &&
          board[row][col] === board[row - 2][col + 2] &&
          board[row][col] === board[row - 3][col + 3]
        ) {
          return board[row][col];
        }
      }
    }
    //Other Diagonal up right
    for (let row = 0; row < rows - 3; row++) {
      for (let col = 0; col < cols - 3; col++) {
        if (
          board[row][col] &&
          board[row][col] === board[row + 1][col + 1] &&
          board[row + 2][col + 2] === board[row + 3][col + 3]
        ) {
          return board[row][col];
        }
      }
    }
    //logic for checking if it is a draw
    if (board.every((row) => row.every((cell) => cell))) {
      setWinner("Draw");
      return "Draw";
    }
    return null;
  }

  return (
    <div style={{ justifyContent: "center", alignItems: "center" }}>
      <h1>Connect Four Board</h1>
      <h2>
        {winner
          ? `Winner: ${winner === "R" ? "Red" : "Yellow"}`
          : `Current Turn: ${currentPlayer === "R" ? "Red" : "Yellow"}`}
      </h2>

      <div className="board">
        {board.map((a, rowindex) => (
          <div key={rowindex} className="row">
            {a.map((b, colindex) => (
              <div
                key={colindex}
                className="col"
                onClick={() => handleClickCell(colindex)}
              >
                {b == "R" && <div className="red-disc"></div>}
                {b == "Y" && <div className="yellow-disc"></div>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
