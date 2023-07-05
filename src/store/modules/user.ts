//定义用户相关的仓库
import { defineStore } from 'pinia'

const useUserStore = defineStore('User', {
    state: () => {
        return {
            // 用于控制登录组件的dialog显示与隐藏
            visiable: false,
        }
    },
    actions: {

    },
    getters: {

    }
});

export default useUserStore