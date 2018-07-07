'use strict';

const models = require('../models');

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
  } else {
    return next();
  }
};
