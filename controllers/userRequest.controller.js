'use strict';

const models = require('../models');
const service = require('../services/matchEvent.service');
const event = require('./event.controller');

module.exports.addUserRequest = async (ctx, next) => {
  if (ctx.method !== 'POST') return next();

  if (ctx.request.body) {
    const {
      categories,
      location,
      dates,
      UserId
    } = ctx.request.body;

    const point = {
      type: 'Point',
      coordinates: [location.lng, location.lat],
      crs: { type: 'name', properties: { name: 'EPSG:4326' } },
    };

    await models.UserRequest.create({
      categories,
      dates,
      UserId,
      status: false,
      location: point,
    });

    const currentUserRequest = await models.UserRequest.findOne({
      where: {
        UserId
      }
    });
    ctx.body = await service.matchEvent(currentUserRequest.dataValues.id, UserId, location, dates, categories);
    ctx.status = 201;
  } else {
    return next();
  }
};

module.exports.updateRequestStatus = async (requestId, UserId, EventId, status) => {
  if (UserId && EventId) {
    await models.UserRequest.update(
      { EventId, UserId, status },
      {
        where: {
          id: requestId,
        },
      },
    );
    const currentEvent = await event.getEvent(EventId);
    if (
      currentEvent.dataValues.UserRequests.length ===
      currentEvent.dataValues.Category.userLimit
    ) {
      event.updateEvent(EventId, 'COMPLETE');
    }
  }
};
