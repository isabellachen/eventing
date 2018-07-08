'use strict';
const controller = require('./webhook.controller')

const models = require('../models');

module.exports.addEvent = async (event) => {
  const {
    categoryId,
    status
  } = event;

  if (categoryId) {
    await models.Event.create({
      CategoryId: categoryId,
      status
    });
  }
};

module.exports.getEvent = async (eventId) => {
  if (eventId) {
    return await models.Event.find(
      { where: { id: eventId } 
      , include: [
          { model: models.Category },
          { model: models.UserRequest }
        ]
      }
    );
  }
};

module.exports.getUserActiveRequest = async (userId, message) => {
  const userRequest = await models.UserRequest.findOne({
    where: {
      UserId: userId,
      status: 'ACCEPTED'
    },
    include: { model: models.User }
  });

  console.log('USER ID:',  userId)

  if (userRequest) {
    const activeRequest = await module.exports.getEvent(userRequest.EventId);
      activeRequest.dataValues.UserRequests.forEach(el => {
      if (el.UserId != userId) {
        controller.callSendAPI(el.UserId, { text: `*${userRequest.dataValues.User.firstName} ${userRequest.dataValues.User.lastName}*\n${message}`})
      }
    })
  }
}

async function foo() {
  const event = await module.exports.getEvent(1)
  console.log(event.dataValues.UserRequests.length)
}

foo()