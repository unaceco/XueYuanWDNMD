'use strict'

module.exports = app => {
  const {
    STRING,
    INTEGER,
  } = app.Sequelize

  /**
   * @desc comment 点赞表
   * likeId: id
	 * type: 1 文章， 2 图片
   */
  const CommentModel = app.model.define('comment', {
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
  }, {
    created_at: 'created_at',
    updated_at: 'updated_at',
    freezeTableName: true,
	})
	
	CommentModel.associate = function() {
		CommentModel.belongsTo(app.model.UserModel, {
      foreignKey: 'from_user_id',
      as: 'from_user'
		})
		CommentModel.belongsTo(app.model.UserModel, {
      foreignKey: 'to_user_id',
      as: 'to_user'
		})
		CommentModel.belongsTo(app.model.ArticleModel, {
      foreignKey: 'article_id'
		})
		CommentModel.belongsTo(app.model.PaintModel, {
      foreignKey: 'paint_id'
    })
	}

  return CommentModel
}