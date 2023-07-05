import { createApp } from 'vue'
//引入清除默认样式文件
import '@/style/reset.scss'
//引入全局组件
import HospitalTop from '@/components/hospital_top/index.vue'
import HospitalBottom from '@/components/hospital_bottom/index.vue'
import Login from '@/components/login/index.vue'
//
import App from '@/App.vue'
//引入路由插件，用于安装路由器
import router from './router'
// 引入element-plus插件
import ElementPlus from 'element-plus'
// 引入Pinia仓库插件
import pinia from '@/store/index'
// 引入国际化中文包
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 引入element-plus相关样式
import 'element-plus/dist/index.css'
//创建应用实例
const app = createApp(App)
//声明全局组件
app.component('HospitalTop', HospitalTop)
app.component('HospitalBottom', HospitalBottom)
app.component('Login', Login)
//应用路由器
app.use(router)
// 安装ElementPlus插件
app.use(ElementPlus, {
    locale: zhCn
})
// 安装Pinia插件
app.use(pinia)
//挂载到页面上
app.mount('#app')
