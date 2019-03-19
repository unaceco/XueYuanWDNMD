'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    const {
      STRING,
      INTEGER,
      DATE,
    } = Sequelize

    // user
    await queryInterface.createTable('user', {
      id: {
        type: INTEGER(20),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      useraccount: {
        type: STRING(50),
        allowNull: false,
      },
      nickname: {
        type: STRING(50),
        allowNull: true,
        defaultValue: 'guest',
      },
      password: {
        type: STRING(100),
        allowNull: false,
      },
      avatar: {
        type: STRING(200),
        allowNull: true,
      },
      created_at: DATE,
      updated_at: DATE
    })

  },




  async down(queryInterface) {

    await queryInterface.dropTable('user')

  },
}