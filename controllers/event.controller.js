'use strict';
const controller = require('./webhook.controller')

const Sequelize = require('sequelize');

const models = require('../models');

module.exports.addEvent = async (category) => {
  const categoryId = await models.Category.findOne({
    where: {
      name: {
        $like: `%${category}%`
      }
    }
  });

  if (categoryId) {
    return await models.Event.create({
      CategoryId: categoryId.dataValues.id,
      status: 'opened'
    });
  }
};

module.exports.getEvent = async (eventId) => {
  if (eventId) {
    const event = await models.Event.find({
      where: { id: eventId },
      group: ['UserRequests.id', 'Event.id', 'Category.id'],
      include: [
        {
          model: models.Category
        },
        {
          model: models.UserRequest,
        },
      ],
    });
    return event;
  }
};

module.exports.updateEvent = async (id, status) => {
  if (id) {
    await models.Event.update(
      {
        status
      },
      {
        where: {
          id
        }
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

  if (userRequest) {
    const activeRequest = await module.exports.getEvent(userRequest.EventId);
      activeRequest.dataValues.UserRequests.forEach(el => {
      if (el.UserId != userId) {
        controller.callSendAPI(el.UserId, { text: `*${userRequest.dataValues.User.firstName} ${userRequest.dataValues.User.lastName}*\n${message}`})
      }
    })
  }
}
