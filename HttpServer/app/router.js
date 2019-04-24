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

  // get userinfo by user id
  router.post('/api/user/findById', controller.api.userController.getUserInfoById)
  
  // 修改密码
  router.post('/api/user/changePwd', controller.api.userController.changePwd)

  // 修改个人信息
  router.put('/api/user/modifyInfo', controller.api.userController.modifyInfo)

  // ---------------  admin
  // 查询全部用户
  router.get('/api/admin/userList', controller.api.userController.getUserList)

  // 根据 userId 查找用户
  router.post('/api/admin/userById', controller.api.userController.getUserById)

  // 根据 user role 查找用户
  router.post('/api/admin/userByRole', controller.api.userController.getUserByRole)

  // 根据 nickname || account 查找用户
  router.post('/api/admin/userByNickname', controller.api.userController.getUserByNickNameOrAccount)

  // 修改用户权限
  router.put('/api/admin/changeUserRole', controller.api.userController.changeUserRole)

  // 删除用户
  router.delete('/api/admin/deleteUserById', controller.api.userController.deleteUserById)

  // 管理员更新用户数据
  router.put('/api/admin/updateUserById', controller.api.userController.updateUserById)
  
  // 管理员更新用户数据
  router.get('/api/admin/getAdminArticleList', controller.api.articleController.getAdminArticleList)
  

  router.post('/api/admin/getArticleByTitle', controller.api.articleController.getArticleByTitle)

  router.delete('/api/admin/deleteArticleById', controller.api.articleController.deleteArticleById)


  // find all
  router.get('/api/admin/paint', controller.api.paintController.adminGetAllPaints)

  router.delete('/api/admin/deletepaint', controller.api.paintController.deletePaintById)

  router.post('/api/admin/getPaintByTitle', controller.api.paintController.getPaintByTitle)

  
  // ------------ 文章相关接口 
  // 发布
  router.post('/api/article/push', controller.api.articleController.writeArticle)

  // find all
  router.get('/api/article', controller.api.articleController.getAllArticles)

  // find by id
  router.post('/api/article/articleId', controller.api.articleController.getArticleById)

  // find all by user id
  router.post('/api/article/userId', controller.api.articleController.getAllArticlesByUserId)


  // ------------ 绘画相关接口
  // 发布
  router.post('/api/paint/push', controller.api.paintController.publishPaint)

  // find all
  router.get('/api/paint', controller.api.paintController.getAllPaints)

  // find by id
  router.post('/api/paint/paintId', controller.api.paintController.getPaintById)

  // find by id
  router.post('/api/paint/userId', controller.api.paintController.getAllPaintsByUserId)
  

  // ------------ 点赞相关
  // change like status
  router.post('/api/like', controller.api.likeController.changeLikeStatus)

  // my love
  router.post('/api/like/myLove', controller.api.likeController.getAllMyLove)

  

  // ------------ 收藏相关
  // change collect status
  router.post('/api/collect', controller.api.collectController.changeCollectStatus)

  // my collect
  router.post('/api/follow/myCollect', controller.api.collectController.getAllMyCollect)


  // ------------ 关注相关
  // get follow status
  router.post('/api/follow/find', controller.api.followController.getFollowStatus)

  // change follow status
  router.post('/api/follow/change', controller.api.followController.changeFollowStatus)

  // find count
  router.post('/api/follow/count', controller.api.followController.getMyFollowCount)
  
  
  // ------------ 评论相关
  // get all comments
  router.post('/api/comments/all', controller.api.commentController.findCommentsById)

  // write comments
  router.post('/api/comments/write', controller.api.commentController.writeComments)


  // ------------- 消息相关
  // get all comments
  router.post('/api/message/comments', controller.api.messageController.getAllComments)

  // get all comments
  router.post('/api/message/likes', controller.api.messageController.getAllLikes)

  // get all follow
  router.post('/api/message/follows', controller.api.messageController.getAllFollow)


}
