const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const gameRoutes = require("./routes/gameRoutes");
const socketHandler = require("./socket/socketHandler");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/game", gameRoutes);

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
socketHandler(io);

const PORT = 3002;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
