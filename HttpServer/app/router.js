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


  // ------------ 文章相关接口
  // 发布
  router.post('/api/article/push', controller.api.articleController.writeArticle)

  // find all
  router.get('/api/article', controller.api.articleController.getAllArticles)

  // find by id
  router.post('/api/article/articleId', controller.api.articleController.getArticleById)

  // ------------ 绘画相关接口
  // 发布
  router.post('/api/paint/push', controller.api.paintController.publishPaint)

  // find all
  router.get('/api/paint', controller.api.paintController.getAllPaints)

  // find by id
  router.post('/api/article/paintId', controller.api.paintController.getPaintById)
}
