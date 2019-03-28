'use strict'

const Service = require('egg').Service

class ArticleService extends Service {
  constructor(ctx) {
    super(ctx)
    this.ctx = ctx
    this.UserModel = ctx.model.UserModel
    this.ArticleModel = ctx.model.ArticleModel
	}
	
	// 发表文章
	async writeArticle(title, content, personal, user_id) {
		const result = await this.ArticleModel.create({
			title, content, personal, user_id
		})

		return {
			success: true,
			msg: '发表成功',
			data: result
		}	
	}

	async getAllArticles() {
		const result = await this.ArticleModel.findAll({
			where: {
				personal: {
					$ne: 1
				}
			},
			include: [{
				model: this.UserModel,
				required: false 
      }]
		})

		return {
			success: true,
			msg: '查找成功',
			data: result
		}
	}

	async getArticleById(articleId) {
		const result = await this.ArticleModel.findOne({
			where: {
				articleId
			},
			include: [{
				model: this.UserModel,
				required: false 
      }]
		})

		return {
			success: true,
			data: result,
			msg: `查询articleId${articleId}成功`
		}

	}


}

module.exports = ArticleService