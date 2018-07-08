'use strict';

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
      status: 'opened'
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
