'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Raw SQL query to create the users table
    await queryInterface.sequelize.query(`
    CREATE TABLE seats (
      seat_number INT PRIMARY KEY,
      status VARCHAR(50) DEFAULT 'available',
      reserved_by INT REFERENCES users(id)
      );
    `);
  },

  async down(queryInterface, Sequelize) {
    // Raw SQL query to drop the users table
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS seats;
    `);
  },
};

