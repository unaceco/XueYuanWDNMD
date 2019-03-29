'use strict'

const Service = require('egg').Service

class LikeService extends Service {
  constructor(ctx) {
    super(ctx)
    this.ctx = ctx
    this.UserModel = ctx.model.UserModel
    this.ArticleModel = ctx.model.ArticleModel
    this.LikeModel = ctx.model.LikeModel
	}

	// 点赞
	async changeLikeStatus(from_user_id, to_user_id, type, info_id) {
		let article_id = null
		let	paint_id = null

		if(type == 1) {
			article_id = info_id
		}else {
			paint_id = info_id
		}

		const result = await this.LikeModel.findOrCreate({
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
				msg: '点赞成功',
				result
			}
    }else {
			await this.removeLikeStatus(from_user_id, to_user_id, type, info_id)
			return {
				success: true,
				msg: '取消点赞成功'
			}
		}
		

	}

	// 取消点赞
	async removeLikeStatus(from_user_id, to_user_id, type, info_id) {
		let article_id = null
		let	paint_id = null

		if(type == 1) {
			article_id = info_id
		}else {
			paint_id = info_id
		}
		
		const result = await this.LikeModel.destroy({
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
			msg: '取消点赞成功',
			result
		}
	}

}

module.exports = LikeService