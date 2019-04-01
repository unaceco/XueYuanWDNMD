'use strict'

const Service = require('egg').Service

class ArticleService extends Service {
  constructor(ctx) {
    super(ctx)
    this.ctx = ctx
    this.UserModel = ctx.model.UserModel
		this.ArticleModel = ctx.model.ArticleModel
		this.LikeModel = ctx.model.LikeModel
    this.CollectModel = ctx.model.CollectModel
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
      },{
				model: this.LikeModel,
				required: false
			},{
				model: this.CollectModel,
				required: false
			}],
			order: [['articleId', 'ASC']],
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
      },{
				model: this.LikeModel,
				required: false
			},{
				model: this.CollectModel,
				required: false
			}]
		})

		return {
			success: true,
			data: result,
			msg: `查询articleId${articleId}成功`
		}

	}


	async getAllArticlesByUserId(user_id) {
		const data = await this.ArticleModel.findAll({
			where: {
				user_id
			},
			include: [{
				model: this.UserModel,
				required: false 
			},{
				model: this.LikeModel,
				required: false
			},{
				model: this.CollectModel,
				required: false
			}],
		})

		return {
			success: true,
			data,
			msg: '查找用户所有文章成功'
		}
	}


}

module.exports = ArticleService