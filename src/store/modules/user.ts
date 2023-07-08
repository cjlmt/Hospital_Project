//定义用户相关的仓库
import { reqCode, reqUserLogin } from '@/api/hospital'
import { defineStore } from 'pinia'
import { LoginData, UserInfo, UserLoginResponseData } from '@/api/hospital/type'
import { UserState } from '../modules/interface/index'
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from '@/utils/user'

const useUserStore = defineStore('User', {
    state: (): UserState => {
        return {
            // 用于控制登录组件的dialog显示与隐藏
            visiable: false,
            // 存储用户的验证码
            code: '',
            userInfo: JSON.parse(GET_TOKEN() as string) || {} as UserInfo
        }
    },
    actions: {
        // 获取验证码的方法
        // 正常开发的时候，只需要发送一个请求，后台就会将验证码推送到用户手机设备当中
        // 当然咱们目前服务器不能向用户手机设备推送验证码（花钱）
        async getCode(phone: string) {
            // 在向服务器携带手机号码，获取验证码
            let result: any = await reqCode(phone)
            if (result.code == 200) {
                this.code = result.data
            }
        },
        // 用户手机号码登录方法
        async userLogin(LoginData: LoginData) {
            let result: UserLoginResponseData = await reqUserLogin(LoginData)
            if (result.code === 200) {
                this.userInfo = result.data
                //本地存储持久化存储用户信息
                SET_TOKEN(JSON.stringify(this.userInfo))
                // 返回一个成功的Promise
                return 'ok'
            } else {
                // 返回一个失败的Promise
                return Promise.reject(new Error(result.message))
            }
        },
        // 退出登录方法
        logout() {
            this.userInfo = { name: '', token: '' }
            // 写成{} as UserInfo应该也可以，反正都取不到userInfo.name，也不会报错
            // 清空本地存储的数据
            REMOVE_TOKEN()
        },
        // 在微信扫码登录场景中，查询本地存储是否有数据
        queryState() {
            // 开启定时器每隔一段时间问：本地存储是否有用户数据
            let timer = setInterval(() => {
                // 本地存储已有数据（扫码成功）
                if (GET_TOKEN()) {
                    // 关闭对话框
                    this.visiable = false
                    // 拷贝数据
                    this.userInfo = JSON.parse(GET_TOKEN() as string)
                    clearInterval(timer)
                }
            }, 1000)
        }
    },
    getters: {

    }
});

export default useUserStore