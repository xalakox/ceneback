'use strict';
module.exports = (sequelize, DataTypes) => {
  const Autores = sequelize.define('Autores', {
    email:  {
      type: DataTypes.STRING,
      primaryKey: true
    },
    nombre: DataTypes.STRING
  }, {});
  Autores.associate = function(models) {
    // associations can be defined here
  };
  return Autores;
};