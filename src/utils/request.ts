import axios from 'axios'
// @ts-ignore   ts无法识别ElMessage的类型
import { ElMessage } from 'element-plus'
// 利用axios对象的create方法可以再创建一个axios实例，这个axios相对于没封装的原生axios设置了基础路径，设置了拦截器，以后就使用该axios对象发送请求即可
// import { ElMessage } from 'element-plus'

const request = axios.create({
    //请求的基础路径
    baseURL: '/api',
    timeout: 5000
})
// 配置请求拦截器，传入一个回调函数
request.interceptors.request.use((config) => {
    return config
})
// 配置响应拦截器,有成功的回调还有失败的回调
request.interceptors.response.use((response) => {
    console.log(response);

    return response.data
}, (error) => {
    console.log(error);
    let status: number
    if (error.response?.status) {
        status = error.response.status
        switch (status) {
            case 404:
                // 弹出错误提示信息框，elementUI提供的方法，需要引入
                ElMessage({
                    type: 'error',
                    message: '请求失败，路径出现问题'
                })
                break
            case 500 | 501 | 502 | 503 | 504 | 505:
                ElMessage({
                    type: 'error',
                    message: '服务器挂了'
                })
                break
            case 401:
                ElMessage({
                    type: 'error',
                    message: '参数有误'
                })
                break
        }
    } else {
        //如果超时，则取不到error对象的response属性，更加取不到这个属性中的status属性，所以要单独处理
        ElMessage({
            type: 'error',
            message: '请求超时，求稍后尝试'
        })
    }


    return Promise.reject(new Error(error.message))
})
export default request
