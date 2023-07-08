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
                    :class="{ active: item.status == -1 || item.availableNumber == -1 }">
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
    </div>
</template>

<script setup lang="ts">
// 引入实现简单封装的请求语句
import { reqHospitalWork } from '@/api/hospital';
// 引入组合式API
import { onMounted, ref } from 'vue';
// 引入路由器和路由方法
import { useRoute } from 'vue-router';
// 创建路由器对象和路由对象
let $route = useRoute()
// 声明响应式变量，并赋予默认值，用于请求挂号数据用
let pageNo = ref<number>(1)
let limit = ref<number>(6)
// 声明响应式变量，用于存储请求获得的预约详情数据(里面包含了所有我们需要的数据),记得初始值是一个空对象
let workData = ref<any>({})
// 因为多个场景要发送请求，所以封装为一个函数
const fetchWorkData = async () => {
    let result = await reqHospitalWork(pageNo.value, limit.value, $route.query.hoscode as string, $route.query.depcode as string)
    if (result.code == 200) {
        workData.value = result.data

    }
}
onMounted(() => {
    fetchWorkData()
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

        .line {
            width: 2px;
            height: 14px;
            background-color: gray;
            margin: 0 10px;
        }

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

                &.active {
                    border: 1px solid #ccc;
                    color: gray;

                    .up {
                        background: #ccc
                    }
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
        }
    }
}
</style>