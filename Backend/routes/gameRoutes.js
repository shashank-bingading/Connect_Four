const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");

// Routes for creating and joining a game
router.post("/create", gameController.createGame);
router.post("/join", gameController.joinGame);

module.exports = router;
