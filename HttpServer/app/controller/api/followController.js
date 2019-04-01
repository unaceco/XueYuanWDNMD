'use strict';

const Controller = require('egg').Controller;

class FollowController extends Controller {
  constructor(ctx) {
    super(ctx);
		this.session = this.ctx.session
    this.followService = ctx.service.followService		
	}

	async changeFollowStatus() {
		const { from_user_id, to_user_id } = this.ctx.request.body
		const response = await this.followService.changeFollowStatus(from_user_id, to_user_id)
		this.ctx.body = response
	}

	async getFollowStatus() {
		const { from_user_id, to_user_id } = this.ctx.request.body
		const response = await this.followService.getFollowStatus(from_user_id, to_user_id)
		this.ctx.body = response
	}

	async getMyFollowCount() {
		const { user_id } = this.ctx.request.body
		const response = await this.followService.getMyFollowCount(user_id)
		this.ctx.body = response
	}

}

module.exports = FollowController