'use strict';

const models = require('../models');

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