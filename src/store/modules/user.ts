//定义用户相关的仓库
import { reqCode, reqUserLogin } from '@/api/hospital'
import { defineStore } from 'pinia'
import { LoginData, UserInfo, UserLoginResponseData } from '@/api/hospital/type'
import { UserState } from '../modules/interface/index'
import { GET_TOKEN, SET_TOKEN } from '@/utils/user'

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
        }
    },
    getters: {

    }
});

export default useUserStore