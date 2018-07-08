'use strict';
const controller = require('./webhook.controller')
const broadcastService = require('../services/broadcast.service');

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
      status: 'OPENED'
    });
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
    broadcastService.broadcastToEvent(userRequest.EventId, message, userId);
  }
}

