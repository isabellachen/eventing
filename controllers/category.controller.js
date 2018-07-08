'use strict';

const models = require('../models');

module.exports.addCategory = async (data) => {
  const {
    name,
    userLimit
  } = data;

  const foundCategory = await models.Category.findOne({where: {name}});
  if (foundCategory) return false;

  return await models.Category.create({
    name,
    userLimit
  });
};
