const queries = require('./queries');
const models = require('../models');
const { callSendAPI } = require('../controllers/callSendAPI'); 

const broadcastToEvent = async (EventId, message, UserId) => {
  const eventInfo = await queries.getEventInfo(EventId);
  console.log('====================================');
  console.log(eventInfo);
  console.log('====================================');
  
  for (let i = 0; i < eventInfo.Users.length; i++) {
    const el = eventInfo.Users[i];
    
    console.log('EL ID: ', el.id)
    console.log('USER ID: ', UserId)
    if(!UserId) {
      const response = {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'button',
            text: 'Check out the event!',
            buttons: [
              {
                type: 'web_url',
                url: `https://f0199975.ngrok.io/event/?eventId=${EventId}`,
                title: 'Details',
                webview_height_ratio: "full",
                messenger_extensions: true
              }
            ]
          }
        }
      }
      callSendAPI(el.id, { text: `${message}` })
      callSendAPI(el.id, response)
    } else if (el.id != UserId) {
      const user = await models.User.findById(UserId);
      callSendAPI(el.id, { text: `*${user.firstName} ${user.lastName}* says:\n${message}` })
    } 
  }

} 

module.exports = {
  broadcastToEvent
}