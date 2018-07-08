const callSendAPI = require('./webhook.controller')
const getResponse = require('../botResponses/responses')
const eventController = require('./event.controller')

function broadcastMessage (userId, message) {
  console.log('braodcast message')
  eventController.getUserActiveRequest(Number(userId), message)
}

module.exports = {broadcastMessage}
