'use strict';

const Controller = require('egg').Controller;

class CommentController extends Controller {
  constructor(ctx) {
    super(ctx);
		this.session = this.ctx.session
    this.commentService = ctx.service.commentService		
	}

	async findCommentsById() {
		const { type, info_id } = this.ctx.request.body
		const response = await this.commentService.findCommentsById(type, info_id)
		this.ctx.body = response
	}

	async writeComments() {
		const { content, type, info_id, from_user_id, to_user_id } = this.ctx.request.body
		const response = await this.commentService.writeComments(content, type, info_id, from_user_id, to_user_id)
		this.ctx.body = response
	}

}

module.exports = CommentController