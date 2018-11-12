const uuidv1 = require('uuid/v1');
const swearwords = require('../controllers/swearwords');

module.exports = (sequelize, DataTypes) => {
  const Comentarios = sequelize.define('Comentarios', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uuidv1,
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
  }, {
    hooks: {
      beforeCreate: async (instance) => {
        const commentTest = await swearwords.confirmaFrase(instance.comentario);
        instance.contenidoInadecuado = commentTest.length > 0;
      },
    },
  });
  Comentarios.associate = (models) => {
    // associations can be defined here
    Comentarios.belongsTo(models.Profesores, { foreignKey: 'profesor' });
    Comentarios.belongsTo(models.Autores, { foreignKey: 'autor' });
  };
  return Comentarios;
};
