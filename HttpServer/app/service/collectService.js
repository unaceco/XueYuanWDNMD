'use strict'

const Service = require('egg').Service

class CollectService extends Service {
  constructor(ctx) {
    super(ctx)
    this.ctx = ctx
    this.UserModel = ctx.model.UserModel
    this.ArticleModel = ctx.model.ArticleModel
    this.PaintModel = ctx.model.PaintModel
		this.LikeModel = ctx.model.LikeModel
    this.CollectModel = ctx.model.CollectModel
	}

	// 收藏
	async changeCollectStatus(from_user_id, to_user_id, type, info_id) {
		let article_id = null
		let	paint_id = null

		if(type == 1) {
			article_id = info_id
		}else {
			paint_id = info_id
		}

		const result = await this.CollectModel.findOrCreate({
			where: {
				from_user_id, 
				to_user_id, 
				type,
				article_id,
				paint_id
			},
			defaults: {
				from_user_id, 
				to_user_id, 
				type,
				article_id,
				paint_id
      }
		})
    if (result[result.length - 1]) {
			return {
				success: true,
				msg: '收藏成功',
				result
			}
    }else {
			await this.removeCollectStatus(from_user_id, to_user_id, type, info_id)
			return {
				success: true,
				msg: '取消收藏成功'
			}
		}
		

	}

	// 取消收藏
	async removeCollectStatus(from_user_id, to_user_id, type, info_id) {
		let article_id = null
		let	paint_id = null

		if(type == 1) {
			article_id = info_id
		}else {
			paint_id = info_id
		}
		
		const result = await this.CollectModel.destroy({
			where: {
				from_user_id,
				to_user_id,
				type,
				article_id,
				paint_id,
			}
		})

		return {
			success: true,
			msg: '取消收藏成功',
			result
		}
	}

	// 我的喜欢
	async getAllMyCollect(user_id) {
		const result = await this.CollectModel.findAll({
			where: {
				from_user_id: user_id
			},
			include: [{
				model: this.ArticleModel,
				required: false,
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
			},{
				model: this.PaintModel,
				required: false,
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
			}],
		})

		return {
			success: true,
			data: result,
			msg: '查找我的收藏成功'
		}


	}

}

module.exports = CollectService