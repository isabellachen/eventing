const controller = require('./webhook.controller')
const botResponses = require('../botResponses/responses')
//functions for bot to send messages without receiving a response first

function eventPending (sender_psid) {
  //when the user has sent their preferences from the FE
  controller.callSendAPI(sender_psid, botResponses.eventPendingResponse())
}

function eventFound (event) {
  // event = {users: [{id: 1921533581204203}], description:'beach volleyball'}
  event.users.forEach(user => {
    controller.callSendAPI(user.id, botResponses.eventFoundResponse(event, user.id))
  })
}

module.exports = {
  eventPending,
  eventFound,
}
