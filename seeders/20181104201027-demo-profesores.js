
const faker = require('faker');
faker.locale = 'es_MX';
const uuidv1 = require('uuid/v1');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const demoData = [...Array(10)].map(e => ({
      id: uuidv1(),
      nombre: faker.name.firstName(),
      apellidos: `${faker.name.lastName()} ${faker.name.lastName()}`,
      calificacionPromedio: faker.random.number({min: 70, max: 100}),
      createdAt:  Sequelize.literal('CURRENT_TIMESTAMP(3)'),
      updatedAt:  Sequelize.literal('CURRENT_TIMESTAMP(3)'),
    }));
    queryInterface.bulkInsert('Profesores', demoData, {});

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Profesores', null, {});
  }
};
