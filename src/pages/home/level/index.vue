<template>
    <div class="level">
        <h1>医院</h1>
        <div class="content">
            <div class="left">
                等级:
            </div>
            <ul class="right">
                <li :class="{ active: activeFlag === '' }" @click="activeFlag = ''">全部</li>
                <li v-for="item in levelArr" :key="item.id" :class="{ active: activeFlag === item.value }"
                    @click="activeFlag = item.value">{{ item.name }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { reqHospitalLevelAndRegion } from '@/api/home/index'
import { HospitalaLevelAndRegionResponseData, HospitalaLevelAndRegionArr } from '@/api/home/type'
// 定义一个数组存储医院等级数据
let levelArr = ref<HospitalaLevelAndRegionArr>([])
// 控制医院等级高亮响应式数据,<>指定泛型表示传进去的会是一个string
let activeFlag = ref<string>('') //也可以用于表明当前需要筛选的等级
onMounted(() => {
    getLevel()
})
// 封装一个请求函数
const getLevel = async () => {
    // 获取接口发送过来的响应体数据，如果没获取到的失败回调要在二次封装axios的地方设置（响应拦截器）
    let result: HospitalaLevelAndRegionResponseData = await reqHospitalLevelAndRegion("HosType")
    if (result.code == 200) {
        levelArr.value = result.data
    }
}
</script>

<script lang="ts">
export default {
    name: 'Level'
}
</script>

<style scoped lang="scss">
.level {
    color: #7f7f7f;
    font-weight: 600;
    font-size: 14px;


    .content {
        margin: 20px 0;
        display: flex;

        .left {
            margin-right: 10px;
        }

        .right {
            display: flex;

            li {
                margin-right: 10px;
            }

            li:hover {
                color: #55a6fe;
                cursor: pointer;
            }

            .active {
                color: #55a6fe;
            }
        }
    }
}
</style>