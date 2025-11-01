import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "../styles/board.css";

const ServerURL = "http://localhost:3002"; 

const Board = ({ gameId, playerId }) => {
  const rows = 6;
  const cols = 7;
  const socketRef = useRef();
  const [board, setBoard] = useState(Array(rows).fill(null).map(() => Array(cols).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState("R");
  const [playerColor, setPlayerColor] = useState(null);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    socketRef.current = io(ServerURL);

    socketRef.current.emit("joinGameRoom", { gameId, playerId: playerId });

    socketRef.current.on(
      "gameUpdate",
      ({ board, currentPlayer, winner, playerColor: colorFromServer, status }) => {
        console.log(
        "Player ID:", playerId,
        "Player Color:", colorFromServer,
        "Current Player Turn:", currentPlayer,
        "Winner:", winner,
        "Status:", status
      );
        setBoard(board);
        setCurrentPlayer(currentPlayer);
        setWinner(winner);
        if (colorFromServer) setPlayerColor(colorFromServer);
      }
    );

    return () => {
      socketRef.current.disconnect();
    };
  }, [gameId, playerId]);


  useEffect(() => {
  console.log("Board state updated:", JSON.stringify(board));
}, [board]);


  const handleClickCell = (colIndex) => {
    if (winner) return;
    if (playerColor !== currentPlayer) return; 

    socketRef.current.emit("makeMove", {
      gameId,
      colIndex,
      playerId: playerId
    });
  };

  return (
    <div style={{ justifyContent: "center", alignItems: "center" }}>
      <h1>Connect Four Board</h1>
      <h2>
        {winner
          ? winner === "Draw"
            ? "It's a Draw!"
            : `Winner: ${winner === "R" ? "Red" : "Yellow"}`
          : playerColor === currentPlayer
            ? "Your turn!"
            : "Opponent's turn"}
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
                {b === "R" && <div className="red-disc"></div>}
                {b === "Y" && <div className="yellow-disc"></div>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
