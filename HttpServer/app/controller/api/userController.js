'use strict'
const ms = require('ms')
const Controller = require('egg').Controller

class UserController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.userService = ctx.service.userService
    this.session = this.ctx.session
  }

  // 登录
  async login() {
    this.ctx.validate({
      useraccount: { type: 'string' },
      password: { type: 'string', min: 1, max: 20 },
      rememberMe: { type: 'boolean', required: false },
    })
    const {
      useraccount,
      password,
      rememberMe = false,
    } = this.ctx.request.body
    const response = await this.userService.login(useraccount, password)
    // if (response.error) this.ctx.status = 403
    if (!response.error && rememberMe) this.ctx.session.maxAge = ms('30d')

    this.ctx.body = response
  }

  // 注册
  async register() {
    this.ctx.validate({
      useraccount: { type: 'string' },
      password: { type: 'string', min: 1, max: 20 },
      nickname: { type: 'string', min: 1, max: 20, required: false },
      avatar: { type: 'url', required: false },
    })
    const {
      useraccount,
      password,
      nickname = 'guest',
      avatar = null,
    } = this.ctx.request.body

    let response = await this.userService.register(useraccount, password, nickname, avatar) 

    this.ctx.body = response
  }

  // 退出
  async logout() {
    this.ctx.session = null
    this.ctx.body = {
      success: true,
      msg: '退出成功'
    }
  }

  async modifyInfo() {
    this.ctx.validate({
      nickname: { type: 'string', min: 1, max: 50 },
      avatar: { type: 'url', required: false },
    })
    const { nickname, avatar } = this.ctx.request.body
    const userID = this.ctx.session.user.userID
    const response = await this.userService.modifyInfo(userID, nickname, avatar)
    if (response.error) this.ctx.status = 403
    this.ctx.body = response
  }

  async changePwd() {
    this.ctx.validate({
      oldPwd: { type: 'string', min: 8, max: 20 },
      changedPwd: { type: 'string', min: 8, max: 20 },
    })
    const { changedPwd, oldPwd } = this.ctx.request.body
    const userID = this.ctx.session.user.userID
    const response = await this.userService.changedPwd(userID, oldPwd, changedPwd)
    if (response.error) this.ctx.status = 403
    this.ctx.body = response
  }

  async forgetPwd() {
    this.ctx.validate({
      nickname: { type: 'string', min: 1, max: 20 },
    })
    const { nickname } = this.ctx.request.body
    const response = await this.userService.forgetPwd(nickname)
    this.ctx.body = response
  }
}

module.exports = UserController
