'use strict';

const eventController = require('./event.controller');

const broadcastMessage = (userId, message) => {
  eventController.getUserActiveRequest(Number(userId), message);
};

module.exports = { broadcastMessage };
