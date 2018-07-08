const request = require('request');

module.exports.callSendAPI = (senderPsid, response) => {
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
    (error, body) => {
      if (error) {
        console.error('Error sending message: ', error); // eslint-disable-line no-console
      } else if (response.body.error) {
        console.error('Error: ', response.body.error); // eslint-disable-line no-console
      }
    },
  );
};
