'use strict'

const Service = require('egg').Service

class PaintService extends Service {
  constructor(ctx) {
    super(ctx)
    this.ctx = ctx
    this.UserModel = ctx.model.UserModel
		this.PaintModel = ctx.model.PaintModel
		this.LikeModel = ctx.model.LikeModel
    this.CollectModel = ctx.model.CollectModel			
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
			},{
				model: this.LikeModel,
				required: false
			},{
				model: this.CollectModel,
				required: false
			}],
			order: [['paintId', 'ASC']],
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
      },{
				model: this.LikeModel,
				required: false
			},{
				model: this.CollectModel,
				required: false
			}]
		})

		return {
			success: true,
			data: result,
			msg: `查询paintId${paintId}成功`
		}
	}

	async getAllPaintsByUserId(user_id) {
		const data = await this.PaintModel.findAll({
			where: {
				user_id
			},
			include: [{
				model: this.UserModel,
				required: false 
			},{
				model: this.LikeModel,
				required: false
			},{
				model: this.CollectModel,
				required: false
			}],
		})

		return {
			success: true,
			data,
			msg: '查找用户所有文章成功'
		}
	}

	async adminGetAllPaints() {
		const result = await this.PaintModel.findAll({
			include: [{
				model: this.UserModel,
				required: false 
			},{
				model: this.LikeModel,
				required: false
			},{
				model: this.CollectModel,
				required: false
			}],
			order: [['paintId', 'ASC']],
		})

		return {
			success: true,
			msg: '查找成功',
			data: result
		}
	}

	// 删除
	async deletePaintById(id) {
		const data = await this.PaintModel.destroy({
			where: {
				paintId: id
			}
		})
		return {
			success: data !== 0 ? true : false,
			msg: data !== 0 ? '删除成功' : '删除失败',
		}
	}

  // 模糊查询
  async getPaintByTitle(title) {
    const data = await this.PaintModel.findAll({
			where: {
				title: {
					$like: `%${title}%`
				}
			},
			include: [{
				model: this.UserModel,
				required: false 
      }],
		})

    return {
      success: true,
      msg: '查询成功',
      data
    }
  }

}

module.exports = PaintService