const {callSendAPI} = require('./callSendAPI')
const botResponses = require('../botResponses/responses')
//functions for bot to send messages without receiving a response first

const eventPending = (sender_psid) => {
  //when the user has sent their preferences from the FE
  callSendAPI(sender_psid, botResponses.eventPendingResponse())
}

const eventFound = (event) => {
  event = {users: [{id: 1921533581204203}], description:'beach volleyball'}
  event.users.forEach(user => {
    callSendAPI(user.id, botResponses.eventFoundResponse(event, user.id))
  })
}

module.exports = {
  eventPending,
  eventFound,
}
