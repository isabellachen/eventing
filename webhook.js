const request = require('request')

// Handles messages events
function handleMessage( sender_psid, received_message) {
  let response;
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

const startQuery = (ctx) => {
  try {
  let body = ctx.request.body;

  if (body.object === 'page') {

    body.entry.forEach(function (entry) {
      let webhook_event = entry.messaging[0]
      let sender_psid = webhook_event.sender.id;

      if (webhook_event.message) {
        
        handleMessage(sender_psid, webhook_event.message)

      } else if (webhook_event.postback) {
        handlePostback(webhook_event.postback)
        console.log('POSTBACK ===',webhook_event);
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