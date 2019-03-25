'use strict'

module.exports = app => {
  const {
    STRING,
    INTEGER,
  } = app.Sequelize

  /**
   * @desc like 点赞表
   * likeId: id
	 * type: 1 文章， 2 图片
   */
  const LikeModel = app.model.define('like', {
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
  }, {
    created_at: 'created_at',
    updated_at: 'updated_at',
    freezeTableName: true,
	})
	
	LikeModel.associate = function() {
		LikeModel.belongsTo(app.model.UserModel, {
      foreignKey: 'from_user_id'
		})
		LikeModel.belongsTo(app.model.UserModel, {
      foreignKey: 'to_user_id'
		})
		LikeModel.belongsTo(app.model.ArticleModel, {
      foreignKey: 'article_id'
    })
	}

  return LikeModel
}