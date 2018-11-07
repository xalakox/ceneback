
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Autores = sequelize.define('Autores', {
    email: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    nombre: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    password: {
      type: DataTypes.VIRTUAL,
      set: async (val) => {
        this.setDataValue('password', val);
        this.setDataValue('passwordHash', (await bcrypt.hash(val, 5)));
      },
      validate: {
        isLongEnough(val) {
          if (val.length < 7) {
            throw new Error('Por favor seleccion una contraseña mas larga');
          }
        },
      },
    },
    createdAt: {
      type: DataTypes.DATE(3),
    },
    updatedAt: {
      type: DataTypes.DATE(3),
    },
  }, {});
  Autores.associate = function (models) {
    // associations can be defined here
  };
  Autores.checkCredentials = async ({ email, password } = {}) => {
    try {
      const record = await Autores.findById(email);
      return record && await bcrypt.compare(password, record.passwordHash);
    } catch (err) {
      console.log('err while checking password', err);
      return false;
    }
  };
  return Autores;
};
