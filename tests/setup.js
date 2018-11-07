const shell = require('shelljs');

module.exports = async () => new Promise((resolve) => {
  shell.exec('npx sequelize db:seed --seed 20181104201027-demo-profesores', () => {
    // crea autores de prueba
    shell.exec('npx sequelize db:seed --seed 20181107022046-autores.js', () => {
      resolve();
    });
  });
});
