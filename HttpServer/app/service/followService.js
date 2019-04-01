'use strict'

const Service = require('egg').Service

class CollectService extends Service {
  constructor(ctx) {
    super(ctx)
    this.ctx = ctx
    this.FollowModel = ctx.model.FollowModel
	}

	// 关注
	async changeFollowStatus(from_user_id, to_user_id) {
		const result = await this.FollowModel.findOrCreate({
			where: {
				from_user_id, 
				to_user_id, 
			},
			defaults: {
				from_user_id, 
				to_user_id, 
      }
		})
    if (result[result.length - 1]) {
			return {
				success: true,
				msg: '关注成功',
				result
			}
    }else {
			await this.removeFollowStatus(from_user_id, to_user_id)
			return {
				success: true,
				msg: '取消关注成功'
			}
		}
		

	}

	// 取消关注
	async removeFollowStatus(from_user_id, to_user_id) {
		const data = await this.FollowModel.destroy({
			where: {
				from_user_id,
				to_user_id,
			}
		})

		return {
			success: true,
			msg: '取消关注成功',
			data
		}
	}

	// 查询关注
	async getFollowStatus(from_user_id, to_user_id) {
		const data = await this.FollowModel.findOne({
			where: {
				from_user_id,
				to_user_id
			}
		})

		return {
			success: true,
			msg: '查找关注状态成功',
			data
		}
	}

	// 查询关注我的人数 我关注的人数
	async getMyFollowCount(user_id) {
		const followFromMe = await this.FollowModel.count({
			where: {
				from_user_id: user_id
			}
		})

		const followToMe = await this.FollowModel.count({
			where: {
				to_user_id: user_id
			}
		})


		return {
			success: true,
			msg:'查询关注人数成功',
			data: {
				followFromMe,
				followToMe
			}
		}
	}

}

module.exports = CollectService