<template>
    <div class="register">
        <div class="top">
            <div class="name">{{ hospitalStore.hospitalInfo.hospital?.hosname }}</div>
            <div class="level">
                <svg t="1688475327785" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="9520" width="16" height="16">
                    <path
                        d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z"
                        p-id="9521"></path>
                </svg>
                <span>{{ hospitalStore.hospitalInfo.hospital?.param.hostypeString }}</span>
            </div>
        </div>
        <div class="content">
            <div class="left">
                <img :src="'data:image/jpeg;base64,' + hospitalStore.hospitalInfo.hospital?.logoData" alt="">
            </div>
            <div class="right">
                <h1>挂号规则</h1>
                <ul>
                    <li>
                        <span>预约周期：{{ hospitalStore.hospitalInfo.bookingRule?.cycle }}天</span>
                        <span>放号时间：{{ hospitalStore.hospitalInfo.bookingRule?.releaseTime }}</span>
                        <span>停挂时间：{{ hospitalStore.hospitalInfo.bookingRule?.stopTime }}</span>
                    </li>
                    <li>具体地址：{{ hospitalStore.hospitalInfo.hospital?.param.fullAddress }}</li>
                    <li>规划路线：{{ hospitalStore.hospitalInfo.hospital?.route }}</li>
                    <li>退号时间：就诊前一工作日{{ hospitalStore.hospitalInfo.bookingRule?.quitTime }}前取消</li>
                </ul>
                <h1>医院预约规则</h1>
                <p v-for="(item, index) in hospitalStore.hospitalInfo.bookingRule?.rule" :key="index">{{ item }}</p>
            </div>
        </div>
        <!-- 医院科室模块 -->
        <div class="department">
            <!-- 左侧大科室导航 -->
            <div class="leftNav">
                <ul>
                    <li v-for="(item, index) in hospitalStore.department" :key="item.depcode"
                        :class="{ active: currentIndex === index }" @click="changeIndex(index)">{{ item.depname }}</li>
                </ul>
            </div>
            <!-- 右侧所有的小科室数据 -->
            <div class="departmentInfos">
                <!-- 每一个小科室数据，根据大科室的data循环渲染 -->
                <div class="departmentInfo" v-for="item in hospitalStore.department" :key="item.depcode">
                    <!-- 大科室标题 -->
                    <h1 class="cur">{{ item.depname }}</h1>
                    <!-- 每一个大科室下的小科室，列表循环渲染 -->
                    <ul>
                        <!-- 直接使用大小科室的编码作为当前渲染项的key值 -->
                        <li v-for="department in item.children" :key="department.depcode" @click="showLogin(department)">
                            {{ department.depname }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
//引入医院详情仓库的数据
import { useDetailStore } from '@/store/modules/hospitalDetail'
//获取仓库对象，也就是存储数据的state
let hospitalStore = useDetailStore()
import { ref } from 'vue'
// 控制科室高亮的响应式数据
let currentIndex = ref<number>(0)
//获取user仓库的数据visiable，可以控制login组件的对话框显示与隐藏

// import useUserStore from '../../../store/modules/user'
//获取仓库对象，也就是存储数据的state
// let userStore = useUserStore()

// 引入路由器和路由函数
import { useRouter, useRoute } from 'vue-router';
// 创建路由器对象
let $router = useRouter()
// 创建路由对象
let $route = useRoute()

// 点击导航项的回调函数
const changeIndex = (index: number) => {
    currentIndex.value = index
    // 点击导航获取右侧对应的大科室的H1标题
    let allH1 = document.querySelectorAll('.cur')
    // 滚动到对应科室的位置
    allH1[index].scrollIntoView({
        // 可以配置其他属性
        // 过渡动画效果
        behavior: 'smooth',
        // 滚动到位置，默认起始位置
        block: 'start'
    })
}
// 点击科室按钮回调
const showLogin = (item: any) => {
    // userStore.visiable = true
    // 点击某一个医院科室按钮，进入到相应的预约挂号详情页面
    // 跳转到预约挂号详情页面
    $router.push({ path: '/hospital/register_step1', query: { hoscode: $route.query.hoscode, depcode: item.depcode } })
}
</script>

<style scoped lang="scss">
.register {
    margin-top: 40px;
    margin-left: 40px;

    .top {
        display: flex;

        .name {
            font-size: 25px;
        }

        .level {
            margin-top: -2px;
            margin-left: 10px;
            display: flex;
            align-items: center;
            color: gray;

            span {
                margin-left: 3px;
            }
        }
    }

    .content {
        display: flex;
        margin-top: 25px;


        .left {
            flex: 2;

            img {
                width: 100px;
                height: 100px;
                border-radius: 50%;
                margin-left: 15px;
            }
        }

        .right {
            color: gray;
            font-size: 13px;
            flex: 10;
            margin-top: 10px;

            h1 {
                margin-bottom: 12px;
                color: black;
            }

            ul {
                li {
                    span {
                        margin-right: 10px;
                    }

                    margin-bottom: 7px;
                }
            }

            p {
                margin-bottom: 7px;

            }
        }
    }

    .department {
        height: 500px;
        margin-top: 20px;
        margin-bottom: 20px;
        display: flex;

        .leftNav {
            width: 80px;
            height: 100%;
            background-color: #f0f2f6;
            font-size: 14px;

            ul {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-around;

                li {
                    height: 40px;
                    // flex: 1;
                    line-height: 40px;
                    color: gray;
                    text-align: center;
                }

                li.active {
                    border-left: 2px solid red;
                    color: red;
                    background-color: white;
                }

                li:hover {
                    cursor: pointer;
                }
            }
        }

        .departmentInfos {
            margin-left: 20px;
            flex: 1;
            height: 100%;
            overflow: auto;

            &::-webkit-scrollbar {
                display: none;
            }

            .departmentInfo {
                h1 {
                    padding: 2px 0 2px 3px;
                    background-color: #f0f2f6;
                    color: gray;
                }

                ul {
                    display: flex;
                    flex-wrap: wrap;
                    // justify-content: space-between;

                    li {
                        width: 33%;
                        height: 25px;
                        line-height: 25px;
                        color: gray;
                    }

                    li:hover {
                        cursor: pointer;
                        background-color: #f0f2f6;
                    }
                }
            }
        }
    }
}
</style>