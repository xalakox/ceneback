const shell = require('shelljs');

module.exports = async () => new Promise((resolve) => {
  // migra la BD
  shell.exec('npx sequelize db:migrate', () => {
    // crea profesores de prueba
    shell.exec('npx sequelize db:seed --seed 20181104201027-demo-profesores', () => {
      // crea autores de prueba
      shell.exec('npx sequelize db:seed --seed 20181107022046-autores.js', () => {
        resolve();
      });
    });
  });
});
