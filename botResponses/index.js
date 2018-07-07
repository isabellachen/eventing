// Define the template and webview
function setPreferences(sender_psid) {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "button",
        text: "OK, tell me what you're interested in, and I'll find an event for you.",
        buttons: [{
          type: "web_url",
          url: process.env.HOST + "/options",
          title: "Set Preferences",
          webview_height_ratio: "full",
          messenger_extensions: true
        }]
      }
    }
  };

  return response;
}


function sendEvent(eventId) {
  let response = {
    text: "Would you like to join this event",
    quick_replies: [
      {
        content_type: "text",
        title: "Yes",
        payload: "{event: eventId, status: 'true'}"
      },
      {
        content_type: "text",
        title: "No",
        payload: "{event: eventId, status: 'false'}"
      },
    ]
  };
}

module.exports = {
  setPreferences
}