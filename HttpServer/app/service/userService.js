'use strict'

const Service = require('egg').Service

class UserService extends Service {
  constructor(ctx) {
    super(ctx)
    this.ctx = ctx
    this.UserModel = ctx.model.UserModel
  }
  // 注册
  async register(useraccount, password, nickname, avatar) {
    const pwdHash = await this.ctx.genHash(password)
    const result = await this.UserModel.findOrCreate({
      where: {
        useraccount,
      },
      defaults: {
        password: pwdHash,
        nickname,
        avatar,
      },
    })
    if (result[result.length - 1]) {
      return {
        success: true,
        msg: '创建成功',
      }
    }
    return {
      success: false,
      msg: '已存在此用户',
    }
  }

  // 登录
  async login(useraccount, password) {
    const user =  await this.UserModel.findUser(useraccount) || null
    
    if (user && await this.ctx.compare(password, user.get('password'))) {

      this.ctx.session.user = {
        userID: user.get('id'),
      }


      return {
        success: true,
        msg: '登录成功',
        data: {
          user: {
            useraccount: user.get('useraccount'),
            nickname: user.get('nickname'),
            avatar: user.get('avatar'),
            id: user.get('id'),
            role: user.get('role'),
          },
        },
      }
    }
    return {
      success: false,
      msg: '用户名或密码错误',
    }
  }

  // 获取用户列表 分页
  async getUserList(limit, offset) {
    const data = await this.UserModel.getAllUser(limit, offset*limit)
    const count = await this.UserModel.count()

    return { 
      success: true,
      msg: '查询用户列表成功', 
      data,
      count
    }
  }
  // 根据id获取单个用户
  async getUserById(id) {
    const data = await this.UserModel.findUserByID(id)

    return {
      success: true,
      msg: `查询 id=${id} 用户成功`,
      data
    }
  }

  // 根据用户权限获取用户
  async getUserByRole(limit, offset, role) {
    const data = await this.UserModel.findAllUserByRole(limit, offset*limit, role)
    const count = await this.UserModel.count({
      where: {
        role
      }
    })

    return {
      success: true,
      msg: `查询 role=${role} 用户成功`,
      data,
      count
    }
  }

  // 修改用户权限
  async changeUserRole(userID, role) {
    const data = await this.UserModel.update({
      role
    }, {
      where: {
        id: userID,
      },
    })

    const message = data !== 0 ? '修改成功' : '修改失败'

    return { 
      success: data !== 0, 
      msg: message
    }
  }

  // 用户昵称 模糊查询
  async getUserByNickNameOrAccount(limit, offset, nickname, useraccount) {
    const data = await this.UserModel.findAllUserByNicknameOrAccount(limit, offset*limit, nickname, useraccount)
    const count = await this.UserModel.count({
      where: {
        $or: [
          {
            nickname: {
              $like: `%${nickname}%`
            }
          },
          {
            useraccount: {
              $like: `%${useraccount}%`
            }
          }
        ]
      }
    })

    return {
      success: true,
      msg: '查询成功',
      count,
      data
    }
  }

  // 删除某一用户
  async deleteUserById(userId) {
    if (this.ctx.session.user.userId == userId) {
      return {
        success: false,
        msg: '不可以删除自己的账户'
      }
    }
    const data = await this.UserModel.destroy({
      where: {
        id: userId
      }
    })
    return {
      success: data !== 0 ? true : false,
      msg: data !== 0 ? '删除成功' : '删除失败',
    }
  }

  // 修改用户信息
  async modifyInfo(userID, nickname, avatar) {
    const result = this.UserModel.update({
      nickname,
      avatar,
    }, {
      where: {
        id: userID,
      },
    })
    return {
      success: true,
      data: result
    }
  }

  async getUserInfoById(id) {
    const data = await this.UserModel.findOne({
      where: {
        id
      }
    })

    return {
      success: true,
      msg: '查找用户成功',
      data
    }

  }

  // 
  async modifyInfo(userID, nickname, avatar) {
    const result = this.UserModel.update({
      nickname,
      avatar,
    }, {
      where: {
        id: userID,
      },
    })
    return {
      error: false,
      data: result,
    }
  }

  async changePwd(id, oldPwd, changedPwd) {
    const user = this.UserModel.findUserByID(id)
    if (user && this.ctx.compare(oldPwd, user.get('password'))) {
      this.UserModel.update({
        password: this.ctx.genHash(changedPwd),
      }, {
        where: {
          id,
        },
      })
      return {
        error: false,
        data: '登录成功',
      }
    }
    return {
      error: true,
      data: '密码错误',
    }
  }
}

module.exports = UserService