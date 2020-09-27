'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn("MovieCasts", "MovieId" ,{
      type : Sequelize.INTEGER,
      references : {
        model : "Movies",
        key : "id"
      },
      onDelete : "cascade",
      onUpdate : "cascade"
    })
    .then(()=> {
      return queryInterface.addColumn("MovieCasts", "CastId", {
        type: Sequelize.INTEGER,
        references : {
          model : "Casts",
          key : "id"
        },
        onDelete : "cascade",
        onUpdate : "cascade"
      })
    })
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.removeColumn("MovieCasts", "MovieId", {}),
      queryInterface.removeColumn("MovieCasts", "CastId", {})
    ])
  }
};
