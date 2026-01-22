import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const ServerURL = "http://localhost:3002";

const Board = ({ gameId, playerId }) => {
  const rows = 6;
  const cols = 7;
  const socketRef = useRef();
  
  const [board, setBoard] = useState(
    Array(rows).fill(null).map(() => Array(cols).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState("R"); // Current turn (R or Y)
  const [playerColor, setPlayerColor] = useState(null);    // THIS player's assigned color
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    socketRef.current = io(ServerURL);

    // Joining the game
    socketRef.current.emit("joinGameRoom", { gameId, playerId });

    socketRef.current.on("gameUpdate", (data) => {
    // Destructuring everything from the game object here nothing special
    const { board, currentPlayer, winner, playerColors } = data;

    console.log("Update received for Player:", playerId);
      
    setBoard(board);
    setCurrentPlayer(currentPlayer);
    setWinner(winner);

      // KEY FIX: Look up the color assigned to THIS specific playerId
      if (playerColors && playerColors[playerId]) {
        setPlayerColor(playerColors[playerId]);
        console.log("My assigned color is:", playerColors[playerId]);
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [gameId, playerId]);

  const handleClickCell = (colIndex) => {
    if (winner) return;
    
    // Check if it's actually this player's turn
    if (playerColor !== currentPlayer) {
      console.log("Not your turn! You are:", playerColor, "Current turn:", currentPlayer);
      return;
    }

    socketRef.current.emit("makeMove", {
      gameId,
      colIndex,
      playerId,
    });
  };

  return (
    <div className="game-container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1>Connect Four</h1>
      
      <div className="status-header">
        {winner ? (
          <h2 className="winner-text">
            {winner === "Draw" ? "It's a Draw!" : `Winner: ${winner === "R" ? "Red" : "Yellow"}`}
          </h2>
        ) : (
          <h2 className={playerColor === currentPlayer ? "your-turn" : "opponent-turn"}>
            {playerColor === currentPlayer ? "Your turn!" : "Opponent's turn"}
            <span style={{ fontSize: '0.8rem', display: 'block' }}>
              (You are: {playerColor === "R" ? "Red" : "Yellow"})
            </span>
          </h2>
        )}
      </div>

      <div className="board">
        {board.map((row, rowindex) => (
          <div key={rowindex} className="row">
            {row.map((cell, colindex) => (
              <div
                key={colindex}
                className="col"
                onClick={() => handleClickCell(colindex)}
              >
                {cell === "R" && <div className="red-disc"></div>}
                {cell === "Y" && <div className="yellow-disc"></div>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;