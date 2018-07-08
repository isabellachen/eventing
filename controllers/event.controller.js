'use strict';

const models = require('../models');
const queries = require('../services/queries');
const controller = require('./webhook.controller')
const broadcastService = require('../services/broadcast.service');

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
      status: 'OPENED'
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
    broadcastService.broadcastToEvent(userRequest.EventId, message, userId);


  }
};

// Get users for event
module.exports.getEventInfo = async (ctx, next) => {
  if (ctx.method !== 'GET') return next();

  const { EventId } = ctx.request.query;

  if (!EventId) {
    ctx.status = 400;
    return next();
  }

  ctx.body = await queries.getEventInfo(EventId);
};

