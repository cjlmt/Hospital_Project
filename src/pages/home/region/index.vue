<template>
    <div class="region">
        <div class="left">地区:</div>
        <ul class="right">
            <li :class="{ active: RegionFlag === '' }" @click="changeRegion('')">全部</li>
            <li v-for="region in regionArr" :key="region.value" :class="{ active: RegionFlag === region.value }"
                @click="changeRegion(region.value)">{{ region.name }}</li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { reqHospitalLevelAndRegion } from '@/api/home/index'
import { HospitalaLevelAndRegionResponseData, HospitalaLevelAndRegionArr } from '@/api/home/type'
// 定义一个数组存储医院等级数据
let regionArr = ref<HospitalaLevelAndRegionArr>([])
// 控制医院等级高亮响应式数据,<>指定泛型表示传进去的会是一个string
let RegionFlag = ref<string>('') //也可以用于表明当前需要筛选的等级
onMounted(() => {
    getRegion()
})
// 封装一个请求函数
const getRegion = async () => {
    // 获取接口发送过来的响应体数据，如果没获取到的失败回调要在二次封装axios的地方设置（响应拦截器）
    let result: HospitalaLevelAndRegionResponseData = await reqHospitalLevelAndRegion("Beijin")
    if (result.code == 200) {
        regionArr.value = result.data
    }
}
const changeRegion = (region: string) => {
    RegionFlag.value = region
    $emit('getRegion', region)
}

//接收该组件被绑定的自定义事件
let $emit = defineEmits(['getRegion'])
</script>

<script lang="ts">
export default {
    name: 'Region'
}
</script>

<style scoped lang="scss">
.region {
    color: #7f7f7f;
    font-weight: 600;
    font-size: 14px;
    display: flex;

    .left {
        margin-right: 10px
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
</style>