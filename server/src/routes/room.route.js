const express = require('express');
const router = express.Router();
const roomController = require('../controller/room.controller');

const routes = (app) => {
    router.get('/', roomController.getRoomsOfUser);
    router.post('/', roomController.createRoom);

    return app.use('/rooms', router);
};

module.exports = routes;
