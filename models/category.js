'use strict';

// Define the Category model
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    userLimit: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {});
  Category.associate = (models) => {
    // Associations can be defined here
    Category.hasOne(models.Event, {
      foreignKey: 'CategoryId',
      onDelete: 'CASCADE'
    });
  };
  return Category;
};
