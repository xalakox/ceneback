

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Evaluaciones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      profesor: {
        type: Sequelize.UUID,
      },
      autorEmail: {
        type: Sequelize.STRING,
      },
      calificacion: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addConstraint('Evaluaciones', ['profesor'], {
      type: 'FOREIGN KEY',
      name: 'FK_eval_profesor',
      references: {
        table: 'Profesores',
        field: 'id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    });
    await queryInterface.addConstraint('Evaluaciones', ['autorEmail'], {
      type: 'FOREIGN KEY',
      name: 'FK_eval_autor',
      references: {
        table: 'Autores',
        field: 'email',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.deleteConstraint('Evaluaciones', 'FK_eval_profesor');
    await queryInterface.deleteConstraint('Evaluaciones', 'FK_eval_autor');
    await queryInterface.dropTable('Evaluaciones');
  },
};
