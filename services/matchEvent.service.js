'use strict';

const Sequelize = require('sequelize');

const models = require('../models');
const event = require('../controllers/event.controller');

module.exports.matchEvent = async (location, dates, categories) => {

  // Declare constant to compute the radius of person the user can match
  const radius = 2000;
  const currentLocation = Sequelize.literal(`ST_GeomFromText('POINT(${location.lng} ${location.lat})')`);
  const distance = Sequelize.fn('ST_DistanceSphere', Sequelize.col('location'), currentLocation);

  const availableEvents = await models.Event.findAll({
    where: {
      status: 'opened',
    },
    include: [{
      model: models.Category,
      where: {
        name: { $in: categories }
      }
    }]
  });

  if (!availableEvents.length) {
    categories.forEach((category) => {
      event.addEvent(category);
    });
    return 1; // Return code 1 to identify the case (No events, new events created)
  }

  // const closestLocations = await models.UserRequest.findAll({
  //   where: Sequelize.where(distance, { $lte: radius }),
  //   group: ['Participation.id', 'Event.id'],
  //   include: [{
  //     model: models.Event,
  //     where: {
  //       active: false,
  //     },
  //     attributes: [
  //       'active',
  //       [Sequelize.fn('ST_AsGeoJSON', Sequelize.fn('ST_Union', Sequelize.col('shape'))), 'shape'],
  //       [Sequelize.fn('SUM', Sequelize.col('distance')), 'distance'],
  //       [Sequelize.fn('ST_Area', Sequelize.fn('ST_Union', Sequelize.col('shape')), true), 'area']
  //     ]
  //   }]
  // });

  // const availableDates = await models.UserRequest.findAll({
  //   attributes: ['dates'],
  //   include: [{
  //     model: models.Event,
  //     where: {
  //       status: 'opened',
  //     },
  //   }]
  // });
};
