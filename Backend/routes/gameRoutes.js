const express = require('express');


const router = express.Router();
const gameController = require('../controllers/gameController');

// just two routes for creating and joining a game keeping it simple for now ig
router.post('/create', gameController.createGame);
router.post('/:id/join', gameController.joinGame);

module.exports = router;
