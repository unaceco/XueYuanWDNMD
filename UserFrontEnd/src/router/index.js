import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '@/page/HomePage/HomePage'
import Personal from '@/page/PersonalPage/Personal'
import Message from '@/page/Message/Message'
import ArticleInfo from '@/page/ArticleInfo/ArticleInfo'
import PaintInfo from '@/page/PaintInfo/PaintInfo'
import WriteArticle from '@/page/WriteArticle/WriteArticle'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/personal',
      name: 'Personal',
      component: Personal
    },
    {
      path: '/message',
      name: 'Message',
      component: Message
    },
    {
      path: '/article/:articleId',
      name: 'ArticleInfo',
      component: ArticleInfo
    },
    {
      path: '/paint/:paintId',
      name: 'PaintInfo',
      component: PaintInfo
    },
    {
      path: '/writeArticle',
      name: 'WriteArticle',
      component: WriteArticle
    }
  ]
})
