<div align="center">

#  Connect Four Live

**Real-time. Multiplayer. Strategic.**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white)](https://socket.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)

---

A modern, full-stack rendition of the classic Connect Four game. Experience seamless gameplay with instant state synchronization across clients.

[  **Play the Live Demo** ](https://connect-four-frontend-ruz5.onrender.com)

</div>

##  Key Features

* ** Real-time Multiplayer**: Powered by **WebSockets (Socket.io)** for zero-latency move synchronization.
* ** Dynamic Room System**: Create custom rooms or join friends instantly using unique room codes.
* ** Server-Side Logic**: Win detection (horizontal, vertical, diagonal) is calculated on the server to ensure game integrity.
* ** Responsive Design**: A "Mobile First" UI built with **Tailwind CSS** that looks great on any device.
* ** Auto-Reconnection**: Smart handling of network drops to keep your game session active.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS 4 |
| **Backend** | Node.js, Express.js |
| **Real-time** | Socket.io |
| **Deployment** | Render (Static Sites & Web Services) |

---

## 📁 Project Structure

```bash
Connect_Four/
├── 📂 Backend/               # Express server & Socket.io logic
│   ├── 📂 controllers/       # Game logic handlers
│   ├── 📂 socket/            # WebSocket event management
│   └── server.js             # Entry point
└── 📂 Frontend/              # React Vite application
    ├── 📂 src/
    │   ├── 📂 components/    # Modular UI (Board, Cell, etc.)
    │   └── App.jsx           # Core application state
    └── vite.config.js        # Build configuration

🎮 How to Play
Join a Room: Enter a room name to join an existing game or start a new one.

Objective: Be the first player to get four of your colored discs in a row (horizontal, vertical, or diagonal).

Taking Turns: Players drop one disc per turn into a multi-column grid. The disc falls to the lowest available space within the column.

Winning: The game ends immediately when a player connects four.

🛠️ Installation & Setup (For Open Source)
Prerequisites
Node.js (v18+)

npm or yarn

1. Clone the repository
Bash
git clone https://github.com/your-username/Connect_Four.git
cd Connect_Four
2. Setup Backend
Bash
cd Backend
npm install
npm start
3. Setup Frontend
Bash
cd ../Frontend/Connect_Four
npm install
npm run dev

🤝 Contributing
Contributions are welcome! If you have a feature request or find a bug, please open an issue or submit a pull request.

-->Fork the Project.

-->Create your Feature Branch (git checkout -b feature/AmazingFeature).

-->Commit your Changes (git commit -m 'Add some AmazingFeature').

-->Push to the Branch (git push origin feature/AmazingFeature).

-->Open a Pull Request.
