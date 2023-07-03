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
            component: () => import('@/pages/hospital/index.vue')
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