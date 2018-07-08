const request = require('request');
const helpers = require('../botResponses/responses');
const fetch = require('cross-fetch');

const userController = require('./user.controller');
const userRequestController = require('./userRequest.controller');
const messagesController = require('./messages.controller');

// Handles messages events
const handleMessage = async (senderPsid, receivedMessage) => {
  if (receivedMessage.quick_reply) {
    const payload = JSON.parse(receivedMessage.quick_reply.payload);
    if (payload.type === 'EVENT_ACCEPTED') {
      userRequestController.updateRequestStatus(
        senderPsid,
        payload.eventId,
        'ACCEPTED',
      );
    }
    if (payload.type === 'EVENT_REJECTED') {
      userRequestController.updateRequestStatus(
        senderPsid,
        payload.eventId,
        'REJECTED',
      );
    }
  } else {
    messagesController.broadcastMessage(senderPsid, receivedMessage.text);
  }
};

// Handles messaging_postbacks events
function handlePostback (senderPsid, receivedPostback) {
  if (receivedPostback.payload === 'START') {
    const response = helpers.setPreferences(senderPsid);
    saveUser(senderPsid);
    callSendAPI(senderPsid, response);
  }
}

async function saveUser (senderPsid) {
  const user = await fetch(`https://graph.facebook.com/v3.0/${senderPsid}?access_token=${
    process.env.PAGE_ACCESS_TOKEN
  }`)
    .then(res => res.json());
  userController.addUser(user);
}

// Sends response messages via the Send API
function callSendAPI (senderPsid, response) {
  console.log('call send api');
  request(
    {
      uri: 'https://graph.facebook.com/v2.6/me/messages',
      qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
      method: 'POST',
      json: {
        recipient: { id: senderPsid },
        message: response,
      },
    },
    (error, response, body) => {
      if (error) {
        console.log('Error sending message: ', error); // eslint-disable-line no-console
      } else if (response.body.error) {
        console.log('Error: ', response.body.error); // eslint-disable-line no-console
      }
    },
  );
}

const startQuery = (ctx) => {
  try {
    const { body } = ctx.request;

    if (body.object === 'page') {
      body.entry.forEach((entry) => {
        let webhook_event = entry.messaging[0];
        let senderPsid = webhook_event.sender.id;
        if (webhook_event.message) {
          handleMessage(senderPsid, webhook_event.message);
        } else if (webhook_event.postback.payload) {
          handlePostback(senderPsid, webhook_event.postback);
        } else {
          console.log( // eslint-disable-line no-console
            'Webhook received unknown messagingEvent: ',
            webhook_event,
          );
        }
      });
      ctx.status = 200;
      ctx.response.body = 'EVENT_RECEIVED';
    } else {
      ctx.sendStatus = 404;
    }
  } catch (error) {
    console.error('ERROR: ', error); // eslint-disable-line no-console
  }
};

module.exports = {
  startQuery,
  callSendAPI,
};
