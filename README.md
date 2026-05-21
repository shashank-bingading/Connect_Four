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

* **Real-time Multiplayer**: Powered by **WebSockets(Socket.io)** for zero-latency move synchronization.

* **Dynamic Room System**: Create custom rooms or join friends instantly using unique room codes.

* **Server-Side Logic**: Win detection (horizontal, vertical, diagonal) is calculated on the server to ensure game integrity.

---

##  Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS 4 |
| **Backend** | Node.js, Express.js |
| **Real-time** | Socket.io |
| **Deployment** | Render (Static Sites & Web Services) |

---

##  Project Structure

```text
Connect_Four/
├── 📂 Backend/
│   ├── 📂 controllers/        # gameController.js
│   ├── 📂 models/             # gameModel.js
│   ├── 📂 routes/             # gameRoutes.js
│   ├── 📂 services/           # gameService.js
│   ├── 📂 socket/             # socketHandler.js
│   └── server.js              # Entry point
└── 📂 Frontend/
    └── 📂 Connect_Four/
        ├── 📂 src/
        │   ├── 📂 Components/ # board.jsx, gameRoom.jsx
        │   ├── App.jsx
        │   └── main.jsx
        ├── index.html
        └── vite.config.js
```
##  How to Play

* **Join a Room:** Enter a room name to join an existing game or start a new one.
* **Objective:** Be the first player to get **four** of your colored discs in a row (horizontal, vertical, or diagonal).
* **Taking Turns:** Players drop one disc per turn into a multi-column grid. The disc falls to the lowest available space.
* **Winning:** The game ends immediately when a player connects four.

---

##  Installation & Setup

### Prerequisites
* **Node.js** (v18+)
* **npm** or **yarn**

### 1. Clone the repository
```bash
git clone https://github.com/shashank-bingading/Connect_Four.git
cd Connect_Four
```
### 2. Setup Backend
```bash
cd Backend
npm install
npm start
```
### 3. Setup Frontend
```bash
cd Frontend/Connect_Four
npm install
npm run dev
```
##  Open Source & Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. **Fork** the Project.
2. **Create** your Feature Branch: 
   `git checkout -b feature/AmazingFeature`
3. **Commit** your Changes: 
   `git commit -m 'Add some AmazingFeature'`
4. **Push** to the Branch: 
   `git push origin feature/AmazingFeature`
5. **Open** a Pull Request.

---
