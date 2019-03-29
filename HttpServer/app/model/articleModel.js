'use strict'

module.exports = app => {
  const {
    STRING,
    INTEGER,
  } = app.Sequelize

  /**
   * @desc article 文章表
   * articleId: id
   * personal  0 不私密  1 私密
   */
  const ArticleModel = app.model.define('article', {
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
		}
  }, {
    created_at: 'created_at',
    updated_at: 'updated_at',
    freezeTableName: true,
	})
	
	ArticleModel.associate = function() {
		ArticleModel.hasMany(app.model.LikeModel, {
      foreignKey: 'article_id'
		})
    ArticleModel.belongsTo(app.model.UserModel, {
      foreignKey: 'user_id'
    })
    ArticleModel.hasMany(app.model.CommentModel, {
      foreignKey: 'article_id'
    })
    ArticleModel.hasMany(app.model.CollectModel, {
      foreignKey: 'article_id'
    })
	}

  return ArticleModel
}