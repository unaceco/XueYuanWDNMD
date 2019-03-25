'use strict'

module.exports = app => {
  const {
    STRING,
    INTEGER,
  } = app.Sequelize

  /**
   * @desc follow 点赞表
   * followId: id
   */
  const FollowModel = app.model.define('follow', {
    followId: {
      type: INTEGER(20),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  }, {
    created_at: 'created_at',
    updated_at: 'updated_at',
    freezeTableName: true,
	})
	
	FollowModel.associate = function() {
		FollowModel.belongsTo(app.model.UserModel, {
      foreignKey: 'from_user_id'
		})
		FollowModel.belongsTo(app.model.UserModel, {
      foreignKey: 'to_user_id'
		})
	}

  return FollowModel
}