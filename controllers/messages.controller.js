const callSendAPI = require('./webhook.controller')
const getResponse = require('../botResponses/responses')

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

function broadcastMessage (user, event, message) {
  const users = event.users
}