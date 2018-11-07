
module.exports = (sequelize, DataTypes) => {
  const Comentarios = sequelize.define('Comentarios', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    profesor: DataTypes.UUID,
    autor: DataTypes.STRING,
    comentario: DataTypes.TEXT,
    contenidoInadecuado: DataTypes.BOOLEAN,
    createdAt: {
      type: DataTypes.DATE(3),
    },
    updatedAt: {
      type: DataTypes.DATE(3),
    },
  }, {});
  Comentarios.associate = (models) => {
    // associations can be defined here
    Comentarios.belongsTo(models.Profesores, { foreignKey: 'FK_profesor' });
    Comentarios.belongsTo(models.Autores, { foreignKey: 'FK_autor' });
  };
  return Comentarios;
};
