
const faker = require('faker');
const fs = require('fs');
const bcrypt = require('bcrypt');

faker.locale = 'es_MX';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const demoData = await Promise.all([...Array(10)].map(() => ({
      email: faker.internet.email(),
      nombre: faker.name.findName(),
      password: faker.internet.password(),
    })).map(async (e) => {
      // agregamos las contraseñas (es un proceso asíncrono)
      const passwordHash = await bcrypt.hash(e.password, 5);
      return { ...e, passwordHash };
    }));
    await fs.writeFileSync(`${__dirname}/../node_modules/autores_prueba.json`, JSON.stringify(demoData));
    await queryInterface.bulkInsert('Autores', demoData.map(({
      email,
      nombre,
      passwordHash,
    }) => ({
      email,
      nombre,
      passwordHash,
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
      updatedAt: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
    })), {});
  },
  down: queryInterface => queryInterface.bulkDelete('Autores', null, {}),
};
