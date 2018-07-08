const callSendAPI = require('./webhook.controller')
const getResponse = require('../botResponses/responses')
const eventController = require('./event.controller')


//event = {name, description, status, users []}

function removeUserFromEvent () {

}

async function notifyUsers (event) {
  const event = getEventFromDb(event.eventId) //TBE
  event.users.forEach(user => {
    const response = getResponse.notifyUsersResponse(user, event)
    callSendAPI(user.id, response)
  })
  //send message to all users that a new user has been added
}

function broadcastMessage (userId, message) {
  console.log('braodcast message')
  eventController.getUserActiveRequest(Number(userId), message)
}

module.exports = {broadcastMessage}
