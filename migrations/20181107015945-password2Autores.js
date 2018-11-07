

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'Autores',
      'passwordHash',
      Sequelize.TEXT,
    );
  },

  down: (queryInterface) => {
    queryInterface.removeColumn(
      'Autores',
      'passwordHash',
    );
  },
};
