const express = require('express');
const router = express.Router();
const messageController = require('../controller/message.controller');

const routes = (app) => {
    router.get('/:roomId', messageController.getMessagesOfRoom);
    router.post('/', messageController.sendMessage);

    return app.use('/messages', router);
};

module.exports = routes;
