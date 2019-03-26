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

    // article
    await queryInterface.createTable('article', {
      articleId: {
        type: INTEGER(20),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: STRING(100),
        allowNull: false,
      },
      content: {
        type: STRING(500),
        allowNull: false,
      },
      personal: {
        type: INTEGER(20),
        allowNull: false,
      },
      user_id: {
        type: INTEGER(20),
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        },
      },
      created_at: DATE,
      updated_at: DATE
    })

    // paint
    await queryInterface.createTable('paint', {
      paintId: {
        type: INTEGER(20),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: STRING(100),
        allowNull: false,
      },
      paintUrl: {
        type: STRING(500),
        allowNull: false,
      },
      personal: {
        type: INTEGER(20),
        allowNull: false,
      },
      user_id: {
        type: INTEGER(20),
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        },
      },
      created_at: DATE,
      updated_at: DATE
    })

    // like
    await queryInterface.createTable('like', {
      likeId: {
        type: INTEGER(20),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: INTEGER(20),
        allowNull: false,
      },
      from_user_id: {
        type: INTEGER(20),
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        },
      },
      to_user_id: {
        type: INTEGER(20),
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        },
      },
      article_id: {
        type: INTEGER(20),
        allowNull: true,
        references: {
          model: 'article',
          key: 'articleId'
        },
      },
      paint_id: {
        type: INTEGER(20),
        allowNull: true,
        references: {
          model: 'paint',
          key: 'paintId'
        },
      },
      created_at: DATE,
      updated_at: DATE
    })

    // comment
    await queryInterface.createTable('comment', {
      commentId: {
        type: INTEGER(20),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: INTEGER(20),
        allowNull: false,
      },
      content: {
        type: STRING(100),
        allowNull: false,
      },
      from_user_id: {
        type: INTEGER(20),
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        },
      },
      to_user_id: {
        type: INTEGER(20),
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        },
      },
      article_id: {
        type: INTEGER(20),
        allowNull: true,
        references: {
          model: 'article',
          key: 'articleId'
        },
      },
      paint_id: {
        type: INTEGER(20),
        allowNull: true,
        references: {
          model: 'paint',
          key: 'paintId'
        },
      },
      created_at: DATE,
      updated_at: DATE
    })

    // follow
    await queryInterface.createTable('follow', {
      followId: {
        type: INTEGER(20),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      from_user_id: {
        type: INTEGER(20),
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        },
      },
      to_user_id: {
        type: INTEGER(20),
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        },
      },
      created_at: DATE,
      updated_at: DATE
    })

  },




  async down(queryInterface) {
    await queryInterface.dropTable('follow')
    await queryInterface.dropTable('comment')
    await queryInterface.dropTable('like')
    await queryInterface.dropTable('paint')
    await queryInterface.dropTable('article')
    await queryInterface.dropTable('user')

  },
}