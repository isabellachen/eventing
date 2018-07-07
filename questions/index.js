//sends introductory message
const welcome = () => {
  return {text: 'Let me find an event for you!\nFirst, tell me what you are interested in.'}
}


const askLocation = () => {
  return {
    text: 'Where do you live?',
    quick_replies: [
      {content_type: location}
    ]
  };
}

const askTime = () => {
  return {text: 'When are you free?'};
}
const goodBye = () => {
  return {text: 'You will hear from us soon with an event near you!'}
}

module.exports = {
  welcome,
  askLocation,
  askTime,
  goodBye,
}