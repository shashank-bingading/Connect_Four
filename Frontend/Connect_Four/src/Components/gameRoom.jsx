import React, { useState } from "react";
import axios from "axios";
import Board from "./board";

const SERVER_URL = "http://localhost:3002";

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
      <div>
        <p>
          <strong>Room ID:</strong> {gameId}
          <button
            style={{ marginLeft: "8px" }}
            onClick={() => {
              navigator.clipboard.writeText(gameId);
              alert("Room ID copied!");
            }}
          >
            Copy
          </button>
        </p>
        <Board gameId={gameId} playerId={playerId} />
      </div>
    );
  }

  return (
    <div>
      <h2>Connect Four - Game Lobby</h2>
      <button onClick={handleCreateGame}>Create New Game</button>
      <div style={{ marginTop: 16 }}>
        <input
          placeholder="Enter Room ID"
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <button onClick={handleJoinGame}>Join Room</button>
      </div>
    </div>
  );
};

export default GameRoom;
