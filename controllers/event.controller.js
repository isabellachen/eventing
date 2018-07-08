'use strict';

const models = require('../models');
const controller = require('./webhook.controller');

module.exports.addEvent = async (category) => {
  const categoryId = await models.Category.findOne({
    where: {
      name: {
        $like: `%${category}%`,
      },
    },
  });

  if (categoryId) {
    const event = await models.Event.create({
      CategoryId: categoryId.dataValues.id,
      status: 'opened',
    });
    return event;
  }
};

module.exports.updateEvent = async (id, status) => {
  if (id) {
    await models.Event.update(
      {
        status,
      },
      {
        where: {
          id,
        },
      },
    );
  }
};

module.exports.getUserActiveRequest = async (userId, message) => {
  const userRequest = await models.UserRequest.findOne({
    where: {
      UserId: userId,
      status: 'ACCEPTED',
    },
    include: { model: models.User },
  });

  if (userRequest) {
    const activeRequest = await module.exports.getEvent(userRequest.EventId);
    activeRequest.dataValues.UserRequests.forEach((el) => {
      if (el.UserId !== userId) {
        controller.callSendAPI(el.UserId, {
          text: `*${userRequest.dataValues.User.firstName} ${
            userRequest.dataValues.User.lastName
          }*\n${message}`,
        });
      }
    });
  }
};
