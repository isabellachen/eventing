const { callSendAPI } = require('./callSendAPI');
const botResponses = require('../botResponses/responses');

// Functions for bot to send messages without receiving a response first
const eventPending = (senderPsid) => {
  // When the user has sent their preferences from the FE
  callSendAPI(senderPsid, botResponses.eventPendingResponse());
};

module.exports = {
  eventPending,
};
