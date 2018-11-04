

module.exports = (sequelize, DataTypes) => {
  const Evaluaciones = sequelize.define('Evaluaciones', {
    profesor: DataTypes.UUID,
    autorEmail: DataTypes.STRING,
    calificacion: DataTypes.INTEGER,
    createdAt: {
      type: DataTypes.DATE(3),
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
    },
    updatedAt: {
      type: DataTypes.DATE(3),
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
    },
  }, {});
  Evaluaciones.associate = (models) => {
    Evaluaciones.belongsTo(models.Profesores, { foreignKey: 'FK_eval_profesor' });
    Evaluaciones.belongsTo(models.Autores, { foreignKey: 'FK_eval_autor' });
  };
  return Evaluaciones;
};
