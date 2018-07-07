const request = require('request')
const helpers = require('./questions')
const fetch = require('cross-fetch')

const userData = {}
//{psid, location, interests, date/time}

// Handles messages events
function handleMessage(sender_psid, received_message) {
  let response;
  let currentUser = userData[sender_psid]
  if (!currentUser) {
    // console.log('init sender')
    //if its the first contact from the sender, init the sender
    currentUser = {counter: 0}
    //send the next message
    //increment the counter
  } 
  else if (!currentUser.interests && currentUser.counter === 1) {
    // console.log('add sender interests')
    //if its the second contact from the sender, they are sending their interests
    //save interests and increment counter
  }
  else if (received_message.attachments && currentUser.counter === 2) {
    // console.log('save sender location')
    currentUser.location = received_message.attachments[0].payload.coordinates
  }
  else if (currentUser.counter === 3) {

  }
  
  if (received_message.text) {
    response = {
      "text": `You sent the message: "${received_message.text}". Now send me an image!`
    }
  }
  callSendAPI(sender_psid, response);   
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {

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
  //saveUserToDb - from Marco
  const user = await fetch(`https://graph.facebook.com/v3.0/${sender_psid}?access_token=${process.env.PAGE_ACCESS_TOKEN}`)
    .then(res => res.json());
  controller.addUser(user)
}

const startQuery = (ctx) => {
  try {
  let body = ctx.request.body;
  
  if (body.object === 'page') {

    body.entry.forEach(function (entry) {
      let webhook_event = entry.messaging[0]
      let sender_psid = webhook_event.sender.id;

      console.log(webhook_event)
      if (webhook_event.message) {     
        saveUser(sender_psid)
        handleMessage(sender_psid, webhook_event.message)
      } else if (webhook_event.postback.payload) {
        handlePostback(webhook_event.postback)
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