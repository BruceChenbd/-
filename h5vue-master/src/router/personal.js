export default [
  {
    path: '/personal',
    name: 'personal',
    component: () => import(/* webpackChunkName: "article" */ 'views/personal.vue'),
    meta: {
      auth: false,
      title: '个人中心',
      keepAlive: true
    }
  }
]
