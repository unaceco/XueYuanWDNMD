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
  const CollectModel = app.model.define('collect', {
    collectId: {
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
	
	CollectModel.associate = function() {
		CollectModel.belongsTo(app.model.UserModel, {
      foreignKey: 'from_user_id'
		})
		CollectModel.belongsTo(app.model.UserModel, {
      foreignKey: 'to_user_id'
		})
		CollectModel.belongsTo(app.model.ArticleModel, {
      foreignKey: 'article_id'
    })
		CollectModel.belongsTo(app.model.PaintModel, {
      foreignKey: 'paint_id'
    })
	}

  return CollectModel
}