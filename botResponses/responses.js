'use strict';

// Define the template and webview
const setPreferences = senderPsid => ({
  attachment: {
    type: 'template',
    payload: {
      template_type: 'button',
      text:
        "OK, tell me what you're interested in, and I'll find an event for you.",
      buttons: [
        {
          type: 'web_url',
          url: `https://f0199975.ngrok.io/infopicker/?userId=${senderPsid}`,
          title: 'Set Preferences',
          webview_height_ratio: 'full',
          messenger_extensions: true,
        },
      ],
    },
  },
});

const eventPendingResponse = () => ({ text: 'You will hear from us soon!' });

const eventFoundResponse = (event, userId) => ({
  text: `Would you like to join ${event.description}`,
  quick_replies: [
    {
      content_type: 'text',
      title: 'Yes',
      payload: `{"type":"EVENT_ACCEPTED", "eventId":"${
        event.id
      }", "status": "true"}`,
    },
    {
      content_type: 'text',
      title: 'No',
      payload: `{"type":"EVENT_REJECTED", "eventId":"${
        event.id
      }", "status": "false"}`,
    },
  ],
});

module.exports = {
  setPreferences,
  eventPendingResponse,
  eventFoundResponse,
};
