'use strict'
const ms = require('ms')
const Controller = require('egg').Controller

class PaintController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.paintService = ctx.service.paintService
    this.session = this.ctx.session
	}
	
	async publishPaint() {
    const { title, paintUrl, personal, user_id } = this.ctx.request.body
		const response = await this.paintService.publishPaint(title, paintUrl, personal, user_id)
		this.ctx.body = response
	}

	async getAllPaints() {
		const response = await this.paintService.getAllpaints()
		this.ctx.body = response
	}

	async getPaintById() {
		const { paintId } = this.ctx.request.body
		const response = await this.paintService.getPaintById(paintId)
		this.ctx.body = response
	}

}

module.exports = PaintController
