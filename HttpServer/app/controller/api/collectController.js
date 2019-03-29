'use strict';

const Controller = require('egg').Controller;

class CollectController extends Controller {
  constructor(ctx) {
    super(ctx);
		this.session = this.ctx.session
    this.collectService = ctx.service.collectService		
	}

	async changeCollectStatus() {
		const { from_user_id, to_user_id, type, info_id } = this.ctx.request.body
		const response = await this.collectService.changeCollectStatus(from_user_id, to_user_id, type, info_id)
		this.ctx.body = response
	}

}

module.exports = CollectController