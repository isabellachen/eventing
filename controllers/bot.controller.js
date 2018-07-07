const controller = require('./webhook.controller')
const botResponses = require('../botResponses')

function eventPending (sender_psid) {
  controller.callSendAPI(sender_psid, botResponses.eventPendingResponse())
}

function eventFound (event) {
  //inform the matched users an event has been found
  event = {users: [{id: 1921533581204203}], description:'beach volleyball'}
  event.users.forEach(user => {
    controller.callSendAPI(user.id, botResponses.eventFoundResponse(event))
  })
}

module.exports = {
  eventPending,
  eventFound,
}
