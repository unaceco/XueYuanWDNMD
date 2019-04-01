'use strict'
const ms = require('ms')
const Controller = require('egg').Controller

class MessageController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.messageService = ctx.service.messageService
    this.session = this.ctx.session
	}
	
	async getAllComments() {
    const { user_id } = this.ctx.request.body
		const response = await this.messageService.getAllComments(user_id)
		this.ctx.body = response
	}

	async getAllLikes() {
    const { user_id } = this.ctx.request.body
		const response = await this.messageService.getAllLikes(user_id)
		this.ctx.body = response
	}

	async getAllFollow() {
    const { user_id } = this.ctx.request.body
		const response = await this.messageService.getAllFollow(user_id)
		this.ctx.body = response
	}

}

module.exports = MessageController
