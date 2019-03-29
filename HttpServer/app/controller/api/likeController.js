'use strict';

const Controller = require('egg').Controller;

class LikeController extends Controller {
  constructor(ctx) {
    super(ctx);
		this.session = this.ctx.session
    this.likeService = ctx.service.likeService		
	}

	async changeLikeStatus() {
		const { from_user_id, to_user_id, type, info_id } = this.ctx.request.body
		const response = await this.likeService.changeLikeStatus(from_user_id, to_user_id, type, info_id)
		this.ctx.body = response
	}

}

module.exports = LikeController