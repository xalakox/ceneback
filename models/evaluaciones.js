

module.exports = (sequelize, DataTypes) => {
  const Evaluaciones = sequelize.define('Evaluaciones', {
    profesor: DataTypes.UUID,
    autorEmail: DataTypes.STRING,
    calificacion: DataTypes.INTEGER,
    createdAt: {
      type: DataTypes.DATE(3),
    },
    updatedAt: {
      type: DataTypes.DATE(3),
    },
  }, {});
  Evaluaciones.associate = (models) => {
    Evaluaciones.belongsTo(models.Profesores, { foreignKey: 'profesor' });
    Evaluaciones.belongsTo(models.Autores, { foreignKey: 'autorEmail' });
  };
  return Evaluaciones;
};
