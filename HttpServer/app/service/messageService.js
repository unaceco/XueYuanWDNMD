'use strict'
const Service = require('egg').Service

class MessageService extends Service {
  constructor(ctx) {
    super(ctx)
    this.ctx = ctx
		this.CommentModel = ctx.model.CommentModel
		this.ArticleModel = ctx.model.ArticleModel
		this.PaintModel = ctx.model.PaintModel
		this.LikeModel = ctx.model.LikeModel
    this.UserModel = ctx.model.UserModel
    this.FollowModel = ctx.model.FollowModel
		
	}

	async getAllComments(user_id) {
		const data = await this.CommentModel.findAll({
			where: {
				to_user_id: user_id
			},
			include: [{
				model: this.UserModel,
				required: false,
				as: 'from_user'
			},{
				model: this.ArticleModel,
				required: false,
			},{
				model: this.PaintModel,
				required: false,
			}]
		})

		return {
			data,
			success: true,
			msg: '查找评论成功'
		}
	}

	async getAllLikes(user_id) {
		const data = await this.LikeModel.findAll({
			where: {
				to_user_id: user_id
			},
			include: [{
				model: this.UserModel,
				required: false,
				as: 'like_from_user'
			},{
				model: this.ArticleModel,
				required: false,
			},{
				model: this.PaintModel,
				required: false,
			}]
		})

		return {
			data,
			success: true,
			msg: '查找点赞成功'
		}
	}

	async getAllFollow(user_id) {
		const data = await this.FollowModel.findAll({
			where: {
				to_user_id: user_id
			},
			include: [{
				model: this.UserModel,
				required: false,
				as: 'follow_from_user'
			}]
		})

		return {
			data,
			success: true,
			msg: '查找关注成功'
		}
	}


}

module.exports = MessageService