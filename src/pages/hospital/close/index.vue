<template>
    <div class="close">
        <div class="head">
            {{ hospitalStore.hospitalInfo.hospital?.hosname }}停诊信息
        </div>
        <el-empty discription="暂无数据" />
    </div>
</template>

<script setup lang="ts">
//引入医院详情仓库的数据
import { useDetailStore } from '@/store/modules/hospitalDetail'
//获取仓库对象，也就是存储数据的state
let hospitalStore = useDetailStore()
</script>

<style scoped lang="scss">
.close {
    margin-top: 40px;
    margin-left: 40px;

    .head {
        font-size: 20px;
        font-weight: 900;
        text-align: center;
    }
}
</style>