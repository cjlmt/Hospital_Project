<template>
  <div>
    <!-- 封装轮播图组件 -->
    <Carousel></Carousel>
    <!-- 封装搜索组件 -->
    <Search></Search>
    <!-- 底部组件展示医院信息和右侧公告 -->
    <el-row :gutter="20">
      <el-col :span="20">
        <!-- 等级子组件 -->
        <Level @getLevel="getLevel"></Level>
        <!-- 等级子组件 -->
        <Region @getRegion="getRegion"></Region>
        <!-- 卡片组件 -->
        <div class="card-container" v-if="hasHospitalArr.length > 0">
          <Card v-for="(item, index) in hasHospitalArr" :key="index" class="card" :hospitalInfo="item"></Card>
        </div>
        <el-empty discription="暂无数据" v-else />
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[4, 6, 10, 20]"
          :background=true layout="total, sizes, prev, pager, ->,next, jumper" :total="total" @size-change="sizeChange"
          @current-change="currentChange" class="pagination" />
      </el-col>
      <el-col :span="4">456</el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
// 引入轮播图插件
import Carousel from "./carousel/index.vue";
// 引入搜索插件
import Search from "./search/index.vue";
// 引入等级组件
import Level from './level/index.vue'
// 引入地区组件
import Region from './region/index.vue'
// 引入医院卡片组件
import Card from './card/index.vue'
// 引入新的ts类型
import { Content, HospitalResponseData } from '@/api/home/type'
// 声明分页器页码
let pageNo = ref<number>(1)
// 声明页面尺寸
let pageSize = ref<number>(4)
// 引入组合式API和vue中的一些方法
import { onMounted, ref } from "vue";
// 引入请求方法
import { reqHospital } from "@/api/home";
// 拿到返回的医院列表数据后，要将已有医院数据存储在本地
let hasHospitalArr = ref<Content>([])
// 存储医院总个数
let total = ref<number>(0)
// 存储等级组件传送的等级数据，用于home筛选医院
let hostype = ref<string>('')
// 存储地区组件传送的地区数据，用于home筛选医院
let districtCode = ref<string>('')
//情况一：发送请求
onMounted(() => {
  getHospitalInfo()
})
// 情况二发送请求：分页器的页码切换的时候
const currentChange = () => {
  getHospitalInfo()
}
// 情况三发送请求：页面尺寸发生改变的时候
const sizeChange = () => {
  // 将页面重置为第一页,好像并不会手动归1，除非不存在
  pageNo.value = 1
  //
  getHospitalInfo()
}
// 将获取所有医院数据的请求封装为一个函数，因为要多次请求，省的每次都传相同的参数和判断
const getHospitalInfo = async () => {
  let result: HospitalResponseData = await reqHospital(pageNo.value, pageSize.value, hostype.value, districtCode.value)
  // if (result.code == 200) {
  //注意ref定义的响应式数据要赋值到value属性中
  // 存储已有医院的数据
  hasHospitalArr.value = result.data.content
  total.value = result.data.totalElements
  // }
}

//getRegion自定义事件的回调函数
const getRegion = (region: string) => {
  districtCode.value = region
  // 重新发送请求
  getHospitalInfo()
}

//getLevel自定义事件的回调函数
const getLevel = (level: string) => {
  hostype.value = level
  // 重新发送请求
  getHospitalInfo()
}

</script>

<style scoped lang="scss">
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;

  .card {
    width: 48%;
    height: 90px;
    margin-bottom: 20px;
  }

  .card:hover {
    cursor: pointer;
  }
}

.pagination {
  margin-bottom: 20px;
}
</style>