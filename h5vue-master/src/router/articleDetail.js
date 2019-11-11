export default [
  {
    path: '/article-detail',
    name: 'articleDetail',
    component: () => import(/* webpackChunkName: "article" */ 'views/articleDetail.vue'),
    meta: {
      auth: false,
      title: '文章详情',
      keepAlive: false
    }
  }
]
