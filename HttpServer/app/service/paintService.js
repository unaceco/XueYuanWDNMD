'use strict'

const Service = require('egg').Service

class PaintService extends Service {
  constructor(ctx) {
    super(ctx)
    this.ctx = ctx
    this.UserModel = ctx.model.UserModel
    this.PaintModel = ctx.model.PaintModel
	}
	
	// 发表
	async publishPaint( title, paintUrl, personal, user_id ) {
		const result = await this.PaintModel.create({
			title, paintUrl, personal, user_id 
		})

		return {
			success: true,
			msg: '发表paint成功',
			data: result
		}	
	}

	async getAllpaints() {
		const result = await this.PaintModel.findAll({
			where: {
				personal: {
					$ne: 1
				}
			},
			include: [{
				model: this.UserModel,
				required: false 
			}]
		})

		return {
			success: true,
			msg: '查找成功',
			data: result
		}
	}

	async getPaintById(paintId) {
		const result = await this.PaintModel.findOne({
			where: {
				paintId
			},
			include: [{
				model: this.UserModel,
				required: false 
      }]
		})

		return {
			success: true,
			data: result,
			msg: `查询paintId${paintId}成功`
		}
	}

}

module.exports = PaintService