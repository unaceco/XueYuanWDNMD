'use strict'
const ms = require('ms')
const Controller = require('egg').Controller

class ArticleController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.articleService = ctx.service.articleService
    this.session = this.ctx.session
	}
	
	async writeArticle() {
    const { title, content, personal, user_id } = this.ctx.request.body
		const response = await this.articleService.writeArticle(title, content, personal, user_id)
		this.ctx.body = response
	}

	async getAllArticles() {
		const response = await this.articleService.getAllArticles()
		this.ctx.body = response
	}

	async getArticleById() {
		const { articleId } = this.ctx.request.body
		const response = await this.articleService.getArticleById(articleId)
		this.ctx.body = response
	}

	async getAllArticlesByUserId() {
		const { user_id } = this.ctx.request.body
		const response = await this.articleService.getAllArticlesByUserId(user_id)
		this.ctx.body = response
	}


}

module.exports = ArticleController
