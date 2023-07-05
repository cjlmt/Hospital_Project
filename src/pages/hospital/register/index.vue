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
    </div>
</template>

<script setup lang="ts">
//引入医院详情仓库的数据
import { useDetailStore } from '@/store/modules/hospitalDetail'
//获取仓库对象，也就是存储数据的state
let hospitalStore = useDetailStore()
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
}
</style>