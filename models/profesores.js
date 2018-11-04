'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profesores = sequelize.define('Profesores', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    nombre: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    calificacionPromedio: DataTypes.FLOAT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, { });
  Profesores.associate = function(models) {
    // associations can be defined here
  };
  return Profesores;
};
