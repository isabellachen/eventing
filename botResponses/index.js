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
          url: process.env.HOST + `/options?${sender_psid}`,
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
  return {text: 'You will hear from us soon'}

  function temp() {
    // return {
    //   attachment: {
    //     type: "template",
    //     payload: {
    //       template_type: "media",
    //       elements: [
    //         {
    //           media_type: "image",
    //           attachment_id: "1919145035043221",
    //           buttons: [
    //             type: "postback",
    //             payload: "thank you",
    //             title: "Thanks!"
    //           ]
    //         }
    //       ]
    //     }
    //   }
    // }
  }
}

function eventFoundResponse (event) {
  return {
    text: `Would you like to join ${event.description}`,
    quick_replies: [
      {
        content_type: "text",
        title: "Yes",
        payload: `{"type":"EVENT_ACCEPTED", "event":"${event.id}", "status": "true"}`
      },
      {
        content_type: "text",
        title: "No",
        payload: `{"type":"EVENT_REJECTED", "event":"${event.id}", "status": "false"}`
      },
    ]
  };
}

module.exports = {
  setPreferences,
  eventPendingResponse,
  eventFoundResponse,
}