const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const gameRoutes = require('./routes/gameRoutes');
const socketHandler = require('./socket/socketHandler');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.json());
app.use('/api/game', gameRoutes);

socketHandler(io); 
//sometimes it dosen't work on 3000 so changed it to 3002 lol
const PORT = 3002;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
