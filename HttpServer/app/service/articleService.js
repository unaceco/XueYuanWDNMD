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

	async getAdminArticleList(limit, offset) {
		const data = await this.ArticleModel.findAll({
			limit,
      offset: limit * offset,
			include: [{
				model: this.UserModel,
				required: false 
      }],
		})

		const count = await this.ArticleModel.count()

		return { 
			success: true,
			msg: '查询文章列表成功', 
			data,
			count
		}
	}

  // 模糊查询
  async getArticleByTitle(limit, offset, title) {
    const data = await this.ArticleModel.findAll({
			limit,
			offset: limit * offset,
			where: {
				title: {
					$like: `%${title}%`
				}
			},
			include: [{
				model: this.UserModel,
				required: false 
      }],
		})
    const count = await this.ArticleModel.count({
			where: {
				title: {
					$like: `%${title}%`
				}
			},
    })

    return {
      success: true,
      msg: '查询成功',
      count,
      data
    }
  }

	// 删除
	async deleteArticleById(id) {
		const data = await this.ArticleModel.destroy({
			where: {
				articleId: id
			}
		})
		return {
			success: data !== 0 ? true : false,
			msg: data !== 0 ? '删除成功' : '删除失败',
		}
	}

}

module.exports = ArticleService