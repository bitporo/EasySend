/**
 * 基础路由
 * @type { *[] }
 */

const constantRouterMap = [
  {
    path: '/',
    name: 'Main',
    redirect: { name: 'MainPage' },
    children: [
      {
        path: '/main',
        name: 'MainPage',
        component: () => import('@/views/main/MainPage.vue')
      },
    ]
  },
]

export default constantRouterMap