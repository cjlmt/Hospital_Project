//定义用户相关的仓库
import { reqCode } from '@/api/hospital'
import { defineStore } from 'pinia'

const useUserStore = defineStore('User', {
    state: () => {
        return {
            // 用于控制登录组件的dialog显示与隐藏
            visiable: false,
            // 存储用户的验证码
            code: ''
        }
    },
    actions: {
        // 获取验证码的方法
        async getCode(phone: string) {
            // 在向服务器携带手机号码，获取验证码
            let result: any = await reqCode(phone)
            if (result.code == 200) {
                this.code = result.data
            }
        }
        // 正常开发的时候，只需要发送一个请求，后台就会将验证码推送到用户手机设备当中
        // 当然咱们目前服务器不能向用户手机设备推送验证码（花钱）
    },
    getters: {

    }
});

export default useUserStore