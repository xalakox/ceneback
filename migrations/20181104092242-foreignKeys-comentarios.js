

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Comentarios', ['profesor'], {
      type: 'FOREIGN KEY',
      name: 'FK_profesor',
      references: {
        table: 'Profesores',
        field: 'id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    });
    await queryInterface.addConstraint('Comentarios', ['autor'], {
      type: 'FOREIGN KEY',
      name: 'FK_autor',
      references: {
        table: 'Autores',
        field: 'email',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.deleteConstraint('Comentarios', 'FK_profesor');
    await queryInterface.deleteConstraint('Comentarios', 'FK_autor');
  },
};
