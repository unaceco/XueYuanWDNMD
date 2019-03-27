'use strict'

const Service = require('egg').Service

class ArticleService extends Service {
  constructor(ctx) {
    super(ctx)
    this.ctx = ctx
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


}

module.exports = ArticleService