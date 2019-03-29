'use strict'

const Service = require('egg').Service

class CommentService extends Service {
  constructor(ctx) {
    super(ctx)
    this.ctx = ctx
		this.UserModel = ctx.model.UserModel
		this.CommentModel = ctx.model.CommentModel		
	}
	
	// 发表评论
	async writeComments(content, type, info_id, from_user_id, to_user_id) {
		let article_id = null
		let	paint_id = null

		if(type == 1) {
			article_id = info_id
		}else {
			paint_id = info_id
		}

		const data = await this.CommentModel.create({
			content, type, article_id, paint_id, from_user_id, to_user_id
		})

		return {
			success: true,
			msg: '发表评论成功',
			data
		}
	}

	// 根据 info_id 查找所有评论
	async findCommentsById(type, info_id) {
		let article_id = null
		let	paint_id = null

		if(type == 1) {
			article_id = info_id
		}else {
			paint_id = info_id
		}

		const data = await this.CommentModel.findAll({
			where: {
				type,
				article_id,
				paint_id,
			},
		})

		return {
			data,
			msg: '查找评论成功',
			success: true
		}
	}




}

module.exports = CommentService