'use strict'

module.exports = app => {
  const {
    STRING,
    INTEGER,
  } = app.Sequelize

  /**
   * @desc user 用户表
   * id: id
   * useraccount: 登录账户名 手机号
   * nickname: 用户昵称
   * password: 用户密码
   * avatar: 用户头像
   */
  const UserModel = app.model.define('user', {
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
  }, {
    created_at: 'created_at',
    updated_at: 'updated_at',
    freezeTableName: true,
  })

  UserModel.findUser = async function (useraccount) {
    return await this.findOne({
      where: {
        useraccount,
      },
    })
  }

  UserModel.getAllUser = async function (limit, offset) {
    return await this.findAll({
      limit,
      offset,
      attributes: ['id', 'useraccount', 'nickname', 'avatar', 'created_at', 'updated_at'],
    })
  }

  UserModel.findUserByID = async function (userID) {
    return await this.findOne({
      where: {
        id: userID,
      },
      attributes: ['id', 'useraccount', 'nickname', 'avatar', 'created_at', 'updated_at'],
    })
  }


  UserModel.findAllUserByNicknameOrAccount = async function (limit, offset, nickname, useraccount) {
    return await this.findAll({
      where: {
        $or: [
          {
            nickname: {
              $like: `%${nickname}%`
            }
          },
          {
            useraccount: {
              $like: `%${useraccount}%`
            }
          }
        ]
      },
      limit,
      offset,
      attributes: ['id', 'useraccount', 'nickname', 'avatar', 'created_at', 'updated_at'],
    })
  }

  UserModel.associate = function () {
    UserModel.hasMany(app.model.LikeModel, {
      foreignKey: 'from_user_id'
    })
    UserModel.hasMany(app.model.LikeModel, {
      foreignKey: 'to_user_id'
    })

    UserModel.hasMany(app.model.CollectModel, {
      foreignKey: 'from_user_id'
    })
    UserModel.hasMany(app.model.CollectModel, {
      foreignKey: 'to_user_id'
    })

    UserModel.hasMany(app.model.ArticleModel, {
      foreignKey: 'user_id'
    })

    UserModel.hasMany(app.model.FollowModel, {
      foreignKey: 'from_user_id'
    })
    UserModel.hasMany(app.model.FollowModel, {
      foreignKey: 'to_user_id'
    })
  }
  return UserModel
}