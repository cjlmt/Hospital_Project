<template>
    <div class="wrap">
        <!-- 顶部结构 -->
        <div class="top">
            <div class="hosname">{{ workData.baseMap?.hosname }}</div>
            <div class="line"></div>
            <div class="BigDepname">{{ workData.baseMap?.bigname }}</div>
            <div class="dot"></div>
            <div class="SmaDepname">{{ workData.baseMap?.depname }}</div>
        </div>
        <!-- 中部 -->
        <div class="center">
            <h1>{{ workData.baseMap?.workDateString }}</h1>
            <div class="container">
                <div class="item" v-for="(item, index) in workData.bookingScheduleList" :key="index"
                    :class="{ active: item.status == -1 || item.availableNumber == -1, cur: item.workDate === workTime.workDate }"
                    @click="changeTime(item)">
                    <!-- <div class="up">{{ workData.baseMap?.bookingScheduleList[Number(item)].workDate }}</div> -->
                    <div class="up">{{ item.workDate }}-{{ item.dayOfWeek }}</div>
                    <div class="down">
                        <div v-if="item.status == 1">即将放号</div>
                        <div v-if="item.status == 0">
                            {{ item.availableNumber == -1 ? '约满' : `有号(${item.availableNumber})` }}
                        </div>
                        <div v-if="item.status == -1">停止挂号</div>
                    </div>
                </div>
            </div>
            <el-pagination layout="prev, pager, next" :total="workData.total" v-model:current-page="pageNo"
                @current-change="fetchWorkData" />
        </div>
        <!-- 底部结构 -->
        <div class="bottom">
            <!-- 展示即将放号的时间 -->
            <div class="noneNumber" v-if="workTime.status === 1">
                <!-- {{ workData.}} -->
                <span>2023年x月xx日08:30分</span>
                <span class="release">放号</span>
            </div>
            <!-- 展示医生的结构 -->
            <div class="hasNumber" v-else>
                <!-- 上午号源 -->
                <div class="beforeNoon">
                    <div class="head">
                        <svg t="1688866594410" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="2965" width="16" height="16">
                            <path
                                d="M505.34 221.87c-9.91 0-17.93-8.04-17.93-17.95V96.25c0-9.91 8.02-17.94 17.93-17.94 9.93 0 17.95 8.03 17.95 17.94v107.67c0 9.91-8.02 17.95-17.95 17.95zM505.34 939.67s0.02 0 0 0c-9.88 0-17.93-8.03-17.93-17.94V814.06c0-9.91 8.04-17.95 17.95-17.95s17.93 8.04 17.93 17.95v107.67c0 9.91-8.02 17.94-17.95 17.94z"
                                fill="#F6BB42" p-id="2966"></path>
                            <path
                                d="M302.32 305.96c-7.02 7.01-18.37 7.01-25.37 0l-76.15-76.14c-6.99-7-6.99-18.36 0-25.37 7.02-7.02 18.37-7.02 25.39 0l76.13 76.13c7.02 7.01 7.02 18.38 0 25.38zM809.9 813.52c-7.02 7.02-18.38 7.02-25.39 0l-76.13-76.13c-7.02-7.01-7.02-18.38 0-25.38 7.02-7.01 18.37-7.01 25.39 0l76.13 76.14c6.99 7 6.99 18.36 0 25.37z"
                                fill="#FFCE54" p-id="2967"></path>
                            <path
                                d="M218.23 508.99c0 9.91-8.04 17.94-17.95 17.94H92.61c-9.91 0-17.93-8.03-17.95-17.94 0-9.91 8.04-17.94 17.95-17.94h107.67c9.91 0 17.95 8.02 17.95 17.94zM936.02 508.99c0 9.91-8.02 17.94-17.93 17.94H810.42c-9.91 0-17.95-8.03-17.95-17.94 0-9.91 8.04-17.94 17.95-17.94h107.67c9.91 0 17.93 8.02 17.93 17.94z"
                                fill="#F6BB42" p-id="2968"></path>
                            <path
                                d="M302.32 712.01c7.02 7 7.02 18.37 0 25.38l-76.13 76.13c-7.02 7.02-18.37 7.02-25.39 0-6.99-7.01-6.99-18.36 0-25.37l76.15-76.14c7-7.01 18.36-7.01 25.37 0zM809.9 204.44c0 0.01 0 0 0 0 6.99 7.02 6.99 18.38 0 25.38l-76.15 76.14c-6.99 7.01-18.35 7.01-25.37 0-7.02-7-7.02-18.37 0-25.38l76.13-76.14c7.01-7 18.37-7 25.39 0z"
                                fill="#FFCE54" p-id="2969"></path>
                            <path
                                d="M505.34 742.27c-128.62 0-233.27-104.65-233.27-233.28S376.72 275.7 505.34 275.7c128.65 0 233.29 104.65 233.29 233.28S633.98 742.27 505.34 742.27z"
                                fill="#FFCE54" p-id="2970"></path>
                            <path
                                d="M505.34 257.75c-138.74 0-251.22 112.48-251.22 251.24S366.6 760.22 505.34 760.22c138.77 0 251.25-112.48 251.25-251.23S644.1 257.75 505.34 257.75z m152.27 403.5c-40.66 40.68-94.74 63.08-152.28 63.08-57.52 0-111.59-22.4-152.25-63.08C312.42 620.59 290 566.5 290 508.99s22.42-111.6 63.09-152.26c40.66-40.68 94.74-63.08 152.25-63.08 57.54 0 111.61 22.4 152.28 63.08 40.67 40.66 63.06 94.75 63.06 152.26s-22.4 111.6-63.07 152.26z"
                                fill="#F6BB42" p-id="2971"></path>
                        </svg>
                        <span>上午号源</span>
                    </div>
                    <!-- 医生信息列表 -->
                    <ul>
                        <li v-for="item in moringArr" :key="item.id">
                            <!-- 医生名字技能 -->
                            <div class="left">
                                <div class="docName">
                                    {{ item.title }}
                                    <div class="line"></div>
                                    {{ item.docname }}
                                </div>
                                <div class="respon">
                                    {{ item.skill }}
                                </div>
                            </div>
                            <!-- 价格和剩余 -->
                            <div class="right">
                                <div class="price">
                                    ￥{{ item.amount }}
                                </div>
                                <el-button type="primary" size="default" class="leftNum">剩余{{ item.availableNumber
                                }}</el-button>
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- 下午号源 -->
                <div class="afternoon">
                    <div class="head">
                        <svg t="1688866646630" class="icon" viewBox="0 0 1330 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="4122" width="16" height="16">
                            <path
                                d="M248.598885 582.029238H82.917861a27.690853 27.690853 0 1 0 0 55.227008h165.681024a27.690853 27.690853 0 0 0 0-55.227008zM1242.839726 582.029238H1077.158702a27.690853 27.690853 0 1 0 0 55.227008h165.681024a27.690853 27.690853 0 0 0 0-55.227008z"
                                fill="#F6BB42" p-id="4123"></path>
                            <path
                                d="M1053.489985 179.970432l-117.260706 117.260706A27.536155 27.536155 0 0 0 974.594259 336.214909l117.879496-117.570101a27.690853 27.690853 0 0 0-38.98377-38.674376z"
                                fill="#FFCE54" p-id="4124"></path>
                            <path
                                d="M635.187941 29.759158V195.440182a27.690853 27.690853 0 0 0 55.227008 0V29.759158a27.690853 27.690853 0 1 0-55.227008 0z"
                                fill="#F6BB42" p-id="4125"></path>
                            <path
                                d="M233.283832 218.644808l117.106009 117.106008a27.536155 27.536155 0 0 0 38.98377-38.98377L272.267603 179.970432a27.690853 27.690853 0 0 0-38.983771 38.674376zM379.163576 720.174107a301.196035 301.196035 0 0 1-20.729465-110.454016 304.444683 304.444683 0 1 1 587.850505 110.454016z"
                                fill="#FFCE54" p-id="4126"></path>
                            <path
                                d="M662.878794 277.739253A331.980838 331.980838 0 0 0 360.909271 747.710262h603.320255a331.980838 331.980838 0 0 0-301.350732-469.971009z m264.068635 414.744001H398.655461a276.75383 276.75383 0 1 1 541.441255-82.763163 270.56593 270.56593 0 0 1-13.149287 82.763163z"
                                fill="#F6BB42" p-id="4127"></path>
                            <path
                                d="M584.756555 957.325377l58.475656 58.475655a27.536155 27.536155 0 0 0 19.491885 8.04427 27.536155 27.536155 0 0 0 19.491885-8.04427l58.630353-58.475655a27.84555 27.84555 0 0 0 0-39.138468 27.84555 27.84555 0 0 0-39.138468 0l-11.447615 11.447615v-99.006401a27.690853 27.690853 0 0 0-27.536155-27.690853 27.690853 27.690853 0 0 0-27.690853 27.690853V930.253314l-11.447615-11.447615a27.690853 27.690853 0 0 0-38.98377 0 27.690853 27.690853 0 0 0 0.154697 38.519678z"
                                fill="#ED5564" p-id="4128"></path>
                            <path
                                d="M1298.066734 692.483254H27.690853a27.690853 27.690853 0 1 0 0 55.227008h1270.375881a27.690853 27.690853 0 1 0 0-55.227008z"
                                fill="#656D78" p-id="4129"></path>
                        </svg>
                        <span>下午号源</span>
                    </div>
                    <!-- 医生信息列表 -->
                    <ul>
                        <li v-for="item in afterArr" :key="item.id">
                            <!-- 医生名字技能 -->
                            <div class="left">
                                <div class="docName">
                                    {{ item.title }}
                                    <div class="line"></div>
                                    {{ item.docname }}
                                </div>
                                <div class="respon">
                                    {{ item.skill }}
                                </div>
                            </div>
                            <!-- 价格和剩余 -->
                            <div class="right">
                                <div class="price">
                                    ￥{{ item.amount }}
                                </div>
                                <el-button type="primary" size="default" class="leftNum">剩余{{ item.availableNumber
                                }}</el-button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// 引入实现简单封装的请求语句
import { reqHospitalWork, reqHospitalDoctor } from '@/api/hospital';
import { DoctorArr, DoctorResponseData, Doctor } from '@/api/hospital/type'
// 引入组合式API
import { onMounted, ref, computed } from 'vue';
// 引入路由器和路由方法
import { useRoute } from 'vue-router';
// 创建路由器对象和路由对象
let $route = useRoute()
// 声明响应式变量，并赋予默认值，用于请求挂号数据用
let pageNo = ref<number>(1)
let limit = ref<number>(6)
// 声明响应式变量，用于存储请求获得的预约详情数据(里面包含了所有我们需要的数据),记得初始值是一个空对象
let workData = ref<any>({})

// 定义单个时间段预约数据,挂载时初始化为第一个时间段
let workTime: any = ref({})
// 获取到数据后，存储排班医生的数据
let docArr = ref<DoctorArr>([])

// 因为多个场景要发送请求，所以封装为一个函数
const fetchWorkData = async () => {
    let result = await reqHospitalWork(pageNo.value, limit.value, $route.query.hoscode as string, $route.query.depcode as string)
    if (result.code == 200) {
        workData.value = result.data
        // 设置默认值，存储第一天日期的数据
        workTime.value = workData.value.bookingScheduleList[0]
    }
}
onMounted(() => {
    fetchWorkData()
    getDoctorWorkData()
})

// 点击Item项，保存此项数据
const changeTime = (item: any) => {
    // 存储用户选择那一天的数据
    workTime.value = item
    // 再发一次获取医生排班的数据
    getDoctorWorkData()
}

// 获取某一个时间段医生排班的数据
const getDoctorWorkData = async () => {
    // 医院的编号
    let hoscode: string = $route.query.hoscode as string
    // 科室的编号
    let depcode: string = $route.query.depcode as string
    // 时间段获取
    let workDate: string = workTime.value.workDate
    // 获取排班医生的数据
    let result: DoctorResponseData = await reqHospitalDoctor(hoscode, depcode, workDate)
    if (result.code === 200) {
        docArr.value = result.data
    }
}

// 计算出下午排班的医生的数据
// 计算属性用到的响应式数据发生改变，实时更新返回的值
let afterArr = computed(() => {
    return docArr.value.filter((doc: Doctor) => {
        return doc.workTime === 1
    })
})
// 计算出上午排班的医生数据
let moringArr = computed(() => {
    return docArr.value.filter((doc: Doctor) => {
        return doc.workTime === 0
    })
})
</script>

<style scoped lang="scss">
.wrap {
    margin-top: 40px;
    margin-left: 40px;

    .top {
        display: flex;
        color: gray;
        font-size: 14px;

        .dot {
            width: 2px;
            height: 2px;
            background-color: gray;
            border-radius: 50%;
            margin: 5px 10px 0;
        }
    }

    .center {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 50px;

        h1 {
            font-size: 14px;
            font-weight: bold;
            color: gray;
        }

        .container {
            display: flex;
            margin: 20px 0;
            width: 100%;

            .item {
                flex: 1;
                height: 80px;
                border: 1px solid skyblue;
                margin: 0 10px;
                display: flex;
                flex-direction: column;
                align-items: center;
                font-size: 14px;
                color: gray;
                transition: 0.2s;

                &.active {
                    border: 1px solid #ccc;
                    color: gray;

                    .up {
                        background: #ccc
                    }
                }

                &.cur {
                    transform: scale(1.1);
                    border-width: 3px;
                }

                .up {
                    height: 30px;
                    line-height: 30px;
                    background-color: #e5f3ff;
                    font-weight: bold;

                }

                .down {
                    height: 50px;
                    line-height: 50px;
                }

                div {
                    width: 100%;
                    text-align: center;
                }
            }

            .item:hover {
                cursor: pointer;
            }
        }
    }

    .bottom {
        margin-top: 30px;

        .noneNumber {
            display: flex;
            justify-content: center;
            color: skyblue;
            font-size: 30px;
            font-weight: bold;

            .release {
                color: gray;
                margin-left: 10px;
            }
        }

        .hasNumber {

            .beforeNoon,
            .afternoon {
                margin-bottom: 20px;

                .head {
                    display: flex;
                    align-items: center;
                    color: #7f7f7f;
                    font-weight: 900;
                    font-size: 16px;
                }

                ul {
                    li {
                        border-bottom: 1px solid #ccc;
                        margin: 20px 0;
                        padding-bottom: 10px;
                        display: flex;
                        justify-content: space-between;

                        .left {

                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;

                            .docName {
                                display: flex;
                                color: #379aff;
                                margin-bottom: 10px;
                                font-weight: 900;
                                font-size: 15px;

                                .line {
                                    width: 2px;
                                    height: 15px;
                                    background-color: #379aff;
                                    margin: 0 10px;
                                }
                            }

                            .respon {
                                font-size: 14px;
                                color: #7f7f7f;
                            }
                        }

                        .right {
                            display: flex;
                            align-items: center;

                            .price {
                                font-size: 14px;
                                color: #7f7f7f;
                            }

                            .leftNum {
                                margin: 0 40px;
                                padding: 0 25px;
                                height: 40px;
                                font-size: 14px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>