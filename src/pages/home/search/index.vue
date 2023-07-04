<template>
  <div class="search">
    <el-autocomplete clearable class="inline-input w-50" placeholder="请输入医院名称" v-model="hosname"
      :fetch-suggestions="fetchData" trigger-on-focus="false" @select="goDetail" />
    <el-button type="primary" size="default" :icon="Search"></el-button>
  </div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { ref } from 'vue'
// 引入发送请求的方法
import { reqHospitalInfo } from '@/api/home/index'
// 引入获取的数据的ts类型
import type { HospitalInfo } from '@/api/home/type'
//引入路由器创建方法
import { useRouter } from 'vue-router'
//创建路由器对象
let $router = useRouter()
//收集搜索的关键字,约束为string
let hosname = ref<string>('')
// 输入框触发的事件回调
const fetchData = async (keyword: string, cb: any) => {
  let result: HospitalInfo = await reqHospitalInfo(keyword)
  let showData = result.data.map((item) => {
    return {
      value: item.hosname,
      hoscode: item.hoscode
    }
  })
  cb(showData)
}
// 点击建议项执行的回调
const goDetail = (item: any) => {
  $router.push({ path: '/hospital/register' })
  console.log(item);
}
</script>

<script lang="ts">
export default {
  name: 'Search'
}
</script>

<style scoped lang="scss">
.search {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 100%;
  margin-top: 10px;

  :deep(.el-input__wrapper) {
    width: 400px;
    margin-right: 10px;
  }
}
</style>