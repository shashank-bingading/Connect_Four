import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const ServerURL = "http://localhost:3002";

const Board = ({ gameId, playerId }) => {
  const rows = 6;
  const cols = 7;
  const socketRef = useRef();

  const [board, setBoard] = useState(
    Array(rows)
      .fill(null)
      .map(() => Array(cols).fill(null)),
  );
  const [currentPlayer, setCurrentPlayer] = useState("R"); // Current turn (R or Y)
  const [playerColor, setPlayerColor] = useState(null); // THIS player's assigned color
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
      console.log(
        "Not your turn! You are:",
        playerColor,
        "Current turn:",
        currentPlayer,
      );
      return;
    }

    socketRef.current.emit("makeMove", {
      gameId,
      colIndex,
      playerId,
    });
  };

  return (
    <div className="bg-olive-cornsilk min-h-screen w-full flex flex-col justify-center items-center font-sans">
      {/* header */}
      <h1 className="text-5xl font-black text-olive-copper mb-8">
        Connect <span className="text-olive-caramel">Four</span> Online
      </h1>
      {/* status */}
      <div className="mb-6 text-center">
        {winner ? (
          <h2 className="text-3xl font-bold text-red-600 uppercase">
            {winner === "Draw"
              ? "It's a Draw!"
              : `Winner: ${winner === "R" ? "Red" : "Yellow"}`}
          </h2>
        ) : (
          <h2
            className={`text-xl font-bold p-2 rounded-lg transition-all ${
              playerColor === currentPlayer
                ? "text-olive-caramel bg-white/50 shadow-sm"
                : "text-olive-copper opacity-60"
            }`}
          >
            {playerColor === currentPlayer ? "Your turn!" : "Opponent's turn"}
            <span className="text-xs block tracking-widest mt-1">
              (YOU ARE: {playerColor === "R" ? "Red" : "Yellow"})
            </span>
          </h2>
        )}
      </div>
      {/* the board */}
      <div className="bg-olive-forest p-3 rounded-2xl shadow-xl border-b-4 border-black/20 flex flex-row">
        {[...Array(cols)].map((_, colindex) => (
          <div
            key={colindex}
            onClick={() => handleClickCell(colindex)}
            className={`flex flex-col rounded-xl transition-colors duration-200 
              ${playerColor === currentPlayer && !winner ? "hover:bg-white/10 cursor-pointer" : "cursor-default"}`}
          >
            {board.map((boardRow, rowindex) => (
              <div
                key={rowindex}
                className="w-12 h-12 md:w-16 md:h-16 bg-black/40 rounded-full m-1 flex items-center justify-center transition-all"
              >
                {boardRow[colindex] === "R" && (
                  <div className="w-[85%] h-[85%] rounded-full bg-red-600 shadow-md animate-drop pointer-events-none"></div>
                )}
                {boardRow[colindex] === "Y" && (
                  <div className="w-[85%] h-[85%] rounded-full bg-olive-caramel shadow-md animate-drop pointer-events-none"></div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
