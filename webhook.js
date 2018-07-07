const request = require('request')
const helpers = require('./helpers')
const fetch = require('cross-fetch')
const userData = require('./mocks')
const data = {
  users: [],
  userRequests: [],
  events: []
}
//{psid, location, interests, date/time}

// Handles messages events
function handleMessage(sender_psid, received_message) {
  let response = helpers.setRoomPreferences(sender_psid)
  callSendAPI(sender_psid, response);   
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
  
  const response = helpers.setRoomPreferences()

  callSendAPI(sender_psid, response)
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

async function saveUser(sender_psid) {
  if (data.users.filter(user => sender_psid === user.id).length) {
    const user = await fetch(`https://graph.facebook.com/v3.0/${sender_psid}?access_token=${process.env.PAGE_ACCESS_TOKEN}`)
      .then(res => res.json());
    data.userRequests.push({id: user.id, status: false})
    data.users.push(user)
    data.events.push({id:1})
  } 
  // controller.addUser(user)
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
    console.error('[ERR] startSurvey: ', error)
  }
}

module.exports = {
  startQuery
}