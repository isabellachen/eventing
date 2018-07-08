'use strict';

const models = require('../models');
const queries = require('../services/queries');
const service = require('../services/matchEvent.service');
const broadcastService = require('../services/broadcast.service');
const event = require('./event.controller');

module.exports.addUserRequest = async (ctx, next) => {
  if (ctx.method !== 'POST') return next();

  if (ctx.request.body) {
    const { categories, location, dates, userId } = ctx.request.body;

    const point = {
      type: 'Point',
      coordinates: [location.lng, location.lat],
      crs: { type: 'name', properties: { name: 'EPSG:4326' } },
    };

    await models.UserRequest.create({
      categories,
      dates,
      UserId: Number(userId),
      status: 'ACCEPTED',
      location: point,
    });

    const currentUserRequest = await models.UserRequest.findOne({
      where: {
        UserId: Number(userId),
      },
    });
    ctx.body = await service.matchEvent(
      currentUserRequest.dataValues.id,
      Number(userId),
      location,
      dates,
      categories,
    );
    ctx.status = 201;
  } else {
    return next();
  }
};

module.exports.updateRequestStatus = async (
  requestId,
  UserId,
  EventId,
  status,
) => {
  if (UserId && EventId) {
    await models.UserRequest.update(
      { EventId, UserId, status },
      {
        where: {
          id: requestId,
        },
      },
    );

    const eventInfo = await queries.getEventInfo(EventId);
    const category = await models.Category.findById(eventInfo.Event.CategoryId);
    if (eventInfo.Users.length === category.userLimit) {
      event.updateEvent(EventId, 'COMPLETE');

      const userNames = eventInfo.Users.map(user => `${user.firstName} ${user.lastName}`);
      broadcastService.broadcastToEvent(
        EventId,
        `You have been added to a new *${
          eventInfo.Category
        }* event with \n *${userNames.join(', ')}*`,
      );
    }
  }
};
