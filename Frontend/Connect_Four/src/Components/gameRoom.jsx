import { useState } from "react";
import axios from "axios";
import Board from "./board";

const SERVER_URL = "https://connect-four-backend-ak13.onrender.com";

const GameRoom = () => {
  const [playerId] = useState(() => Math.random().toString(36).substr(2, 6));
  const [gameId, setGameId] = useState("");
  const [isJoined, setIsJoined] = useState(false);

  const handleCreateGame = async () => {
    try {
      const res = await axios.post(`${SERVER_URL}/api/game/create`, {});
      setGameId(res.data.gameId);
      setIsJoined(true);
    } catch (err) {
      alert("Could not create game.");
    }
  };

  const handleJoinGame = async () => {
    if (!gameId) return alert("Enter a valid Room ID!");
    try {
      const res = await axios.post(`${SERVER_URL}/api/game/join`, {
        gameId,
        playerId,
      });
      if (res.data.success) setIsJoined(true);
      else alert("Game is full or does not exist.");
    } catch (err) {
      alert("Could not join game.");
    }
  };
  if (isJoined && gameId) {
    return (
      <div className="bg-olive-cornsilk min-h-screen flex flex-col items-center">
        <div className="mt-8 flex items-center gap-4 bg-olive-forest/10 p-4 rounded-xl border border-olive-forest/20">
        <p className="text-olive-forest font-bold">
          Room ID: <span className="font-mono bg-white px-2 py-1 rounded ml-2">{gameId}</span>
          </p>
          <button
            className="bg-olive-forest text-white px-3 py-1 rounded-md text-sm hover:bg-olive-caramel transition-colors"
            onClick={() => {
              navigator.clipboard.writeText(gameId);
              alert("Room ID copied!");
            }}
          >
            Copy
          </button>
        
        </div>
        <Board gameId={gameId} playerId={playerId} />
      </div>
    );
  }

  return (
    <div className="bg-olive-cornsilk min-h-screen w-full font-sans font-medium flex flex-col justify-center items-center ">
      <h1 className="text-5xl font-black text-olive-copper tracking-tighter drop-shadow-md mb-2">
        Connect <span className="text-olive-caramel">Four</span> Online
      </h1>
      <div className="bg-olive-forest rounded-md shadow-2xl p-8 w-[90%] md:w-full md:max-w-md border border-olive-leaf">
        <h2 className="text-olive-cornsilk to-yellow-400 text-3xl ">
          Play Game
        </h2>
        <button
          onClick={handleCreateGame}
          className="bg-olive-leaf text-olive-cornsilk px-4 py-2 rounded-md mb-4 w-full hover:bg-olive-caramel"
        >
          Create New Game
        </button>
        <div className="mt-4 flex flex-col gap-2">
          <input
            placeholder="Enter Room ID"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
            style={{ marginRight: 8 }}
            className="bg-olive-cornsilk border border-olive-caramel px-2 py-1 rounded-md text-olive-forest"
          />
          <button
            onClick={handleJoinGame}
            className="bg-olive-leaf text-olive-cornsilk px-2 py-2 rounded-md hover:bg-olive-caramel"
          >
            Join Game Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameRoom;
