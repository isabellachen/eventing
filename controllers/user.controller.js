'use strict';

const models = require('../models');
const queries = require('../services/queries');

// Add a new user
module.exports.addUser = async (user) => {
  const {
    id,
    first_name,
    last_name,
    profile_pic
  } = user;

  if (id && first_name && last_name) {
    const userInfo = await models.User.findOne({
      where: {
        id,
      },
    });

    if (userInfo) return userInfo;

    await models.User.create({
      id,
      firstName: first_name,
      lastName: last_name,
      pictureUrl: profile_pic,
    });
  }
};

// Get users for event
module.exports.getEventInfo = async (ctx, next) => {
  if (ctx.method !== 'GET') return next();

  const { EventId } = ctx.request.query;

  ctx.body = await queries.getEventInfo(EventId);
};
