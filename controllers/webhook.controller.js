const request = require('request')
const helpers = require('../botResponses/responses')
const fetch = require('cross-fetch')

const userController = require('./user.controller');
const userRequestController = require('./userRequest.controller');
const messagesController = require('./messages.controller');

// Handles messages events
async function handleMessage(sender_psid, received_message) {
  if (received_message.quick_reply) {
    const payload = JSON.parse(received_message.quick_reply.payload)
    if (payload.type === 'EVENT_ACCEPTED') {
      userRequestController.updateRequestStatus(sender_psid, payload.eventId, 'ACCEPTED')
    }
    if (payload.type === 'EVENT_REJECTED') {
      userRequestController.updateRequestStatus(sender_psid, payload.eventId, 'REJECTED')
    } 
  } else {
    messagesController.broadcastMessage(sender_psid, received_message.text)
  }
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
  if (received_postback.payload === 'START') {
    console.log('START')
    const response = helpers.setPreferences()
    saveUser(sender_psid)
    callSendAPI(sender_psid, response)
  }
}

async function saveUser(sender_psid) {
  const user = await fetch(`https://graph.facebook.com/v3.0/${sender_psid}?access_token=${process.env.PAGE_ACCESS_TOKEN}`)
    .then(res => res.json());
  userController.addUser(user)
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: {
      recipient: {id: sender_psid},
      message: response,
    }
  }, (error, response, body) => {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}

const startQuery = (ctx) => {
  try {
  let body = ctx.request.body;
  
  if (body.object === 'page') {

    body.entry.forEach(function (entry) {
      let webhook_event = entry.messaging[0]
      let sender_psid = webhook_event.sender.id;
      if (webhook_event.message) {    
        handleMessage(sender_psid, webhook_event.message)
      } else if (webhook_event.postback.payload) {
        handlePostback(sender_psid, webhook_event.postback)
      } else {
        console.log("Webhook received unknown messagingEvent: ", webhook_event);
      }
    });
    ctx.status = 200
    ctx.response.body ='EVENT_RECEIVED';
  } else {
    ctx.sendStatus = 404;
  }
  } catch (error) {
    console.error('ERROR: ', error)
  }
}

module.exports = {
  startQuery,
  callSendAPI
}