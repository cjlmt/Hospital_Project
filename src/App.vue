<template>
  <div class="container">
    <!-- 顶部组件 -->
    <HospitalTop />
    <!-- 路由组件 -->
    <div class="content">
      <router-view></router-view>
    </div>
    <!-- 底部组件 -->
    <HospitalBottom />
    <!-- 登录组件 -->
    <Login />
  </div>
</template>

<script setup lang="ts">
//测试代码
/* // 引入axios对象发送请求
import request from '@/utils/request.ts'
// 引入组合式API
import { onMounted } from "vue";
onMounted(() => {
  request.get('/hosp/hospital/1/10').then(res => {
    console.log('app组件展示获取的数据', res);
  })
}) */
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .content {
    min-height: 700px;
    width: 1200px;
    margin-top: 70px;
  }
}
</style>