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
          url: `https://833fac75.ngrok.io/?userId=${sender_psid}`,
          title: "Set Preferences",
          webview_height_ratio: "full",
          messenger_extensions: true
        }]
      }
    }
  };
  return response;
}

function eventPendingResponse () {
  return {text: 'You will hear from us soon!'}
}

function eventFoundResponse (event, userId) {
  return {
    text: `Would you like to join ${event.description}`,
    quick_replies: [
      {
        content_type: "text",
        title: "Yes",
        payload: `{"type":"EVENT_ACCEPTED", "eventId":"${event.id}", "status": "true"}`
      },
      {
        content_type: "text",
        title: "No",
        payload: `{"type":"EVENT_REJECTED", "eventId":"${event.id}", "status": "false"}`
      },
    ]
  };
}

function notifyUsersResponse (user, event) {
  return {
    text: `${user.firstName} ${user.lastName} has been added to event ${event.name}`
  }
}

module.exports = {
  setPreferences,
  eventPendingResponse,
  eventFoundResponse,
}