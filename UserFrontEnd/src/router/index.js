import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '@/page/HomePage/HomePage'
import Personal from '@/page/PersonalPage/Personal'
import Message from '@/page/Message/Message'
import ArticleInfo from '@/page/ArticleInfo/ArticleInfo'
import PaintInfo from '@/page/PaintInfo/PaintInfo'
import WriteArticle from '@/page/WriteArticle/WriteArticle'
import PublishPaint from '@/page/PublishPaint/PublishPaint'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
    },
    {
      path: '/personal',
      name: 'Personal',
      component: Personal,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/message',
      name: 'Message',
      component: Message,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/article/:articleId',
      name: 'ArticleInfo',
      component: ArticleInfo,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/paint/:paintId',
      name: 'PaintInfo',
      component: PaintInfo,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/writeArticle',
      name: 'WriteArticle',
      component: WriteArticle,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/publishPaint',
      name: 'PublishPaint',
      component: PublishPaint,
      meta: {
        requireAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (sessionStorage.length === 0) {
      alert('请登录')
      next({
        path: '/'
      })
    } else {
      next()
    }
  }else {
    next()
  }
})


export default router
