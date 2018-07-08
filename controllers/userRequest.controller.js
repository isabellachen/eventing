'use strict';

const models = require('../models');
const service = require('../services/matchEvent.service');

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

    ctx.body = await service.matchEvent(location, dates, categories);
    ctx.status = 201;
  } else {
    return next();
  }
};

module.exports.updateRequestStatus = async(UserId, EventId, status) => {
  if (UserId && EventId) {
    await models.UserRequest.findOneAndUpdate(
      { EventId, UserId },
      { status });
      return true;
  }
  return false;
}

