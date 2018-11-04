'use strict';
module.exports = (sequelize, DataTypes) => {
  const Autores = sequelize.define('Autores', {
    email:  {
      type: DataTypes.STRING,
      primaryKey: true
    },
    nombre: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE(3),
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
    },
    updatedAt: {
      type: DataTypes.DATE(3),
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
    },
  }, {});
  Autores.associate = function(models) {
    // associations can be defined here
  };
  return Autores;
};