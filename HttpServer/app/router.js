'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller,
  } = app

  // -------- 公共接口
  router.get('/api/common/uploadToken', controller.api.commonController.generateSignature)

  // -------- 用户相关接口
  
  // 注册
  router.post('/api/user/register', controller.api.userController.register)

  // 登录
  router.post('/api/user/login', controller.api.userController.login)

  // 退出
  router.get('/api/user/logout', controller.api.userController.logout)

  // 修改密码
  router.post('/api/user/changePwd', controller.api.userController.changePwd)

  // 修改个人信息
  router.put('/api/user/modifyInfo', controller.api.userController.modifyInfo)


  // 文章相关接口
  router.post('/api/article/push', controller.api.articleController.writeArticle)


}
