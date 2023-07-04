import { createRouter, createWebHistory } from "vue-router";
//createRouter用来创建路由器实例（路由器负责管理路由）
//暴露路由器
export default createRouter({
    //路由的模式设置
    history: createWebHistory(),
    //管理路由
    routes: [
        {
            path: '/home',
            component: () => import('@/pages/home/index.vue')
        },
        {
            path: '/hospital',
            component: () => import('@/pages/hospital/index.vue'),
            children: [
                {
                    path: 'register',
                    component: () => import('@/pages/hospital/register/index.vue')
                },
                {
                    path: 'detail',
                    component: () => import('@/pages/hospital/detail/index.vue')
                },
                {
                    path: 'notice',
                    component: () => import('@/pages/hospital/notice/index.vue')
                },
                {
                    path: 'close',
                    component: () => import('@/pages/hospital/close/index.vue')
                },
                {
                    path: 'search',
                    component: () => import('@/pages/hospital/search/index.vue')
                }
            ]
        },
        {
            path: '/',
            redirect: '/home'
        }
    ],
    scrollBehavior() {
        return {
            left: 0,
            top: 0
        }
    }
})