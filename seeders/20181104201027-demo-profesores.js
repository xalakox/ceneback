
const faker = require('faker');
const fs = require('fs');

faker.locale = 'es_MX';
const uuidv1 = require('uuid/v1');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const demoData = [...Array(10)].map(() => ({
      id: uuidv1(),
      nombre: faker.name.firstName(),
      apellidos: `${faker.name.lastName()} ${faker.name.lastName()}`,
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
      updatedAt: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
    }));
    await fs.writeFileSync(`${__dirname}/../node_modules/profesores_prueba.json`, JSON.stringify(demoData));
    await queryInterface.bulkInsert('Profesores', demoData, {});
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Profesores', null, {}),
};
