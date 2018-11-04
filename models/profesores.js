'use strict';
module.exports = (sequelize, DataTypes) => {
  // create 10 professors
  const Profesores = sequelize.define('Profesores', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    nombre: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    calificacionPromedio: DataTypes.FLOAT,
    createdAt: {
      type: DataTypes.DATE(3),
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
    },
    updatedAt: {
      type: DataTypes.DATE(3),
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
    },
  }, { });
  Profesores.associate = function(models) {
    // associations can be defined here
  };
  return Profesores;
};
