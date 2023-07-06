<template>
    <div class="login_container">
        <el-dialog v-model="userStore.visiable" title="用户登录">
            <!-- 对话框身体部分结构 -->
            <div class="content">
                <!-- 左侧结构：收集号码登录，微信扫一扫登录 -->
                <div class="left">
                    <div class="first" v-if="loginToggle">
                        <el-form>
                            <el-form-item>
                                <el-input placeholder="请输入手机号码" :prefix-icon="User" v-model="loginParam.phone">
                                    <!-- <template #prefix>
                                        <el-icon class="el-input__icon">
                                            <search />
                                        </el-icon>
                                    </template> -->
                                </el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input placeholder="请输入手机验证码" :prefix-icon="Lock" v-model="loginParam.code"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button :disabled="!isPhone" @click="getCode">获取验证码</el-button>
                            </el-form-item>
                        </el-form>
                        <div class="bottom">
                            <el-button type="primary" size="default" style="width: 90%;">用户登录</el-button>
                            <div class="toggle" @click="toggle">
                                <p>微信扫码登录</p>
                                <svg t="1688554045398" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="3555" width="32" height="32">
                                    <path
                                        d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                                        fill="#28C445" p-id="3556"></path>
                                    <path
                                        d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                                        fill="#28C445" p-id="3557"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="second" v-else>
                        <h1>微信登录</h1>
                        <div class="code">
                            <img src="@/assets/images/code_login_wechat.png">
                        </div>
                        <p>使用微信扫一扫登录</p>
                        <p>“尚硅谷”</p>
                        <div class="phone" @click="toggle">
                            <h2>手机短信验证码登录</h2>
                            <svg t="1688556672509" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="8215" width="32" height="32">
                                <path d="M512.1 512.4m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z" fill="#d81e06"
                                    p-id="8216" data-spm-anchor-id="a313x.7781069.0.i20" class="selected"></path>
                                <path
                                    d="M619.9 796.8H404.2c-23.8 0-43.3-19.5-43.3-43.3V271.2c0-23.8 19.5-43.3 43.3-43.3h215.7c23.8 0 43.3 19.5 43.3 43.3v482.3c0 23.9-19.5 43.3-43.3 43.3z"
                                    fill="#FFFFFF" p-id="8217"></path>
                                <path
                                    d="M623.2 734H401c-7.7 0-13.9-6.2-13.9-13.9V304.7c0-7.7 6.2-13.9 13.9-13.9h222.2c7.7 0 13.9 6.2 13.9 13.9v415.4c0 7.7-6.2 13.9-13.9 13.9z"
                                    fill="#d81e06" p-id="8218" data-spm-anchor-id="a313x.7781069.0.i21" class="selected">
                                </path>
                                <path d="M512.1 765.8m-15.8 0a15.8 15.8 0 1 0 31.6 0 15.8 15.8 0 1 0-31.6 0Z" fill="#d81e06"
                                    p-id="8219" data-spm-anchor-id="a313x.7781069.0.i24" class="selected"></path>
                                <path
                                    d="M550.2 474.4c1-0.5 1.4-1.7 0.9-2.7-1.4-3.3-5.7-9.5-17.3-9.5-15.8 0-21.6 5.7-21.6 5.7s-4.1-5.7-21.6-5.7-25.1 23.5-21.3 42.3c4.1 20.2 17.5 39.6 25.9 39.6s10.9-4.6 18-4.6 12.3 4.6 18.3 4.6 13.1-5.2 18-13.4c3.4-5.7 5.3-11.5 6.1-14.6 0.3-1.1-0.3-2.2-1.4-2.6-4.1-1.3-13.1-5.6-13.1-19.2 0.1-13.1 6.2-18.2 9.1-19.9zM532.4 435.2c1.6-0.3 3.1 1 3 2.6-0.3 3.8-1.4 10.3-5.6 15.1-4.2 4.8-10.5 6.8-14.2 7.6-1.6 0.3-3.1-1-3-2.6 0.3-3.8 1.4-10.3 5.6-15.1 4.2-4.9 10.5-6.8 14.2-7.6z"
                                    fill="#d81e06" p-id="8220" data-spm-anchor-id="a313x.7781069.0.i22" class="selected">
                                </path>
                                <path
                                    d="M522.8 263.5H473c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5h49.8c2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5z"
                                    fill="#BF67E8" p-id="8221"></path>
                                <path d="M548.1 259.5m-5 0a5 5 0 1 0 10 0 5 5 0 1 0-10 0Z" fill="#BF67E8" p-id="8222">
                                </path>
                            </svg>
                        </div>
                    </div>
                </div>
                <!-- 右侧结构：扫码关注或者下载app -->
                <div class="right">
                    <div class="top">
                        <div class="subscribe">
                            <img src="@/assets/images/code_login_wechat.png">
                            <svg t="1688554385067" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="3899" width="16" height="16">
                                <path
                                    d="M664.250054 368.541681c10.015098 0 19.892049 0.732687 29.67281 1.795902-26.647917-122.810047-159.358451-214.077703-310.826188-214.077703-169.353083 0-308.085774 114.232694-308.085774 259.274068 0 83.708494 46.165436 152.460344 123.281791 205.78483l-30.80868 91.730191 107.688651-53.455469c38.558178 7.53665 69.459978 15.308661 107.924012 15.308661 9.66308 0 19.230993-0.470721 28.752858-1.225921-6.025227-20.36584-9.521864-41.723264-9.521864-63.862493C402.328693 476.632491 517.908058 368.541681 664.250054 368.541681zM498.62897 285.87389c23.200398 0 38.557154 15.120372 38.557154 38.061874 0 22.846334-15.356756 38.156018-38.557154 38.156018-23.107277 0-46.260603-15.309684-46.260603-38.156018C452.368366 300.994262 475.522716 285.87389 498.62897 285.87389zM283.016307 362.090758c-23.107277 0-46.402843-15.309684-46.402843-38.156018 0-22.941502 23.295566-38.061874 46.402843-38.061874 23.081695 0 38.46301 15.120372 38.46301 38.061874C321.479317 346.782098 306.098002 362.090758 283.016307 362.090758zM945.448458 606.151333c0-121.888048-123.258255-221.236753-261.683954-221.236753-146.57838 0-262.015505 99.348706-262.015505 221.236753 0 122.06508 115.437126 221.200938 262.015505 221.200938 30.66644 0 61.617359-7.609305 92.423993-15.262612l84.513836 45.786813-23.178909-76.17082C899.379213 735.776599 945.448458 674.90216 945.448458 606.151333zM598.803483 567.994292c-15.332197 0-30.807656-15.096836-30.807656-30.501688 0-15.190981 15.47546-30.477129 30.807656-30.477129 23.295566 0 38.558178 15.286148 38.558178 30.477129C637.361661 552.897456 622.099049 567.994292 598.803483 567.994292zM768.25071 567.994292c-15.213493 0-30.594809-15.096836-30.594809-30.501688 0-15.190981 15.381315-30.477129 30.594809-30.477129 23.107277 0 38.558178 15.286148 38.558178 30.477129C806.808888 552.897456 791.357987 567.994292 768.25071 567.994292z"
                                    fill="#515151" p-id="3900"></path>
                            </svg>
                            <p>微信扫一扫关注</p>
                            <p>“快速预约挂号”</p>
                        </div>
                        <div class="download">
                            <img src="@/assets/images/code_app.png">
                            <svg t="1688554482340" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="5063" width="16" height="16">
                                <path
                                    d="M736.653061 929.959184H287.346939c-45.97551 0-83.591837-37.616327-83.591837-83.591837V177.632653c0-45.97551 37.616327-83.591837 83.591837-83.591837h449.306122c45.97551 0 83.591837 37.616327 83.591837 83.591837v668.734694c0 45.97551-37.616327 83.591837-83.591837 83.591837zM287.346939 135.836735c-22.987755 0-41.795918 18.808163-41.795919 41.795918v668.734694c0 22.987755 18.808163 41.795918 41.795919 41.795918h449.306122c22.987755 0 41.795918-18.808163 41.795919-41.795918V177.632653c0-22.987755-18.808163-41.795918-41.795919-41.795918H287.346939z"
                                    fill="#515151" p-id="5064"></path>
                                <path
                                    d="M616.489796 815.020408H407.510204c-11.493878 0-20.897959-9.404082-20.897959-20.897959s9.404082-20.897959 20.897959-20.897959h208.979592c11.493878 0 20.897959 9.404082 20.897959 20.897959s-9.404082 20.897959-20.897959 20.897959z"
                                    fill="#515151" p-id="5065"></path>
                            </svg>
                            <p>扫一扫下载</p>
                            <p>“预约挂号”APP</p>
                        </div>
                    </div>
                    <div class="bottom">
                        <p>xxxxxx官方指定平台</p>
                        <p>快速挂号 安全放心</p>
                    </div>
                </div>
            </div>
            <template #footer>
                <el-button type="primary">关闭窗口</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
// 引入图标组件
import { User, Lock } from '@element-plus/icons-vue'
//获取user仓库的数据visiable，可以控制login组件的对话框显示与隐藏
import { ref, reactive, computed } from 'vue';
import useUserStore from '../../store/modules/user'
//获取仓库对象，也就是存储数据的state
let userStore = useUserStore()
// @ts-ignore
import { ElMessage } from 'element-plus';
// 定义响应式数据控制左侧盒子显示哪个模块
let loginToggle = ref<boolean>(true)
// 获取输入框中的电话号码和验证码等表单数据
let loginParam = reactive({
    phone: '', //收集手机号码
    code: '' //收集验证码
})
// 定义切换左侧盒子内容的回调函数
const toggle = () => {
    loginToggle.value = loginToggle.value ? false : true
}
// 计算出当前表单元素手机的内容是否手机号码格式
let isPhone = computed(() => {
    //手机号码正则表达式,用两个斜杠包裹
    const reg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/
    // 返回布尔值：真代表手机号码、假代表的即为不是手机号码
    // 正则表达式对象
    return reg.test(loginParam.phone)
})
// 定义点击获取验证码的回调函数
const getCode = async () => {
    //通知pinia仓库发送请求存储验证码
    try {
        // 获取验证码成功
        await userStore.getCode(loginParam.phone)
        // 组件响应式数据获取到验证码
        loginParam.code = userStore.code
    } catch (error) {
        // 获取验证码失败
        ElMessage('获取验证码失败')
    }
}
</script>

<script lang="ts">
export default {
    name: 'Login'
}
</script>

<style scoped lang="scss">
.login_container {
    :deep(.el-dialog__body) {
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        margin: 0 10px;
    }


    .content {
        width: 100%;
        display: flex;

        .left {
            width: 330px;
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 20px;

            .first {
                height: 240px;

                .bottom {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    .toggle {
                        display: flex;
                        flex-direction: column;
                        align-items: center;

                    }

                    .toggle:hover {
                        cursor: pointer;
                    }

                    p {
                        margin: 10px 0;
                    }
                }
            }

            .second {
                height: 420px;

                display: flex;
                flex-direction: column;
                align-items: center;

                h1 {
                    font-size: 20px;
                    margin-bottom: 20px;
                }

                .code {
                    width: 250px;
                    height: 250px;
                    border: 1px solid #ccc;
                    border-radius: 3px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 10px;

                    img {
                        width: 230px;
                        height: 230px;
                    }
                }

                p {
                    margin: 3px 0;
                    font-size: 13px;
                    font-weight: 900;
                }

                .phone {
                    margin-top: 35px;
                    font-size: 14px;
                    color: gray;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .phone:hover {
                    cursor: pointer;
                }
            }
        }

        .right {
            flex: 1;
            display: flex;
            flex-direction: column;
            margin-left: 20px;

            .top {
                display: flex;
                justify-content: space-around;

                img {
                    width: 120px;
                    height: 120px;
                }

                div {
                    width: 47%;
                }

                .subscribe,
                .download {
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    p {
                        font-size: 12px;
                        margin: 3px 0;
                    }
                }

            }

            .bottom {
                font-size: 20px;
                font-style: italic;
                display: flex;
                flex-direction: column;
                align-items: center;
                margin: 20px 0;

                p {
                    margin: 15px 0;
                }
            }
        }
    }
}
</style>