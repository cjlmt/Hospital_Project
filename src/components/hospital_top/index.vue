<template>
  <div class="top">
    <div class="content">
      <!-- 左侧区域 -->
      <div class="left" @click="goHome">
        <img src="../../assets/images/logo.png" alt="log" />
        <p>尚医通 预约挂号统一平台</p>
      </div>
      <!-- 右侧区域 -->
      <div class="right">
        <div class="help">帮助中心</div>
        <div>登录注册</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
//创建路由器对象
let $router = useRouter()
const goHome = () => {
  //编程式导航跳转到首页
  $router.push({ path: '/home' })
}
</script>

<style scoped lang="scss">
.top {
  position: fixed;
  z-index: 999;
  height: 70px;
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;

  //
  border-bottom: #ccc solid 1px;

  .content {
    background-color: #fff;
    height: 70px;
    width: 1200px;
    display: flex;
    justify-content: space-between;

    .left {
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        height: 50px;
        width: 50px;
        margin-right: 10px;
      }

      p {
        color: #55a6fe;
        font-size: 20px;
      }
    }

    .left:hover {
      cursor: pointer;
    }

    .right {
      display: flex;
      justify-content: center;
      align-items: center;
      color: gray;
      font-size: 14px;

      .help {
        margin-right: 10px;
      }
    }
  }
}
</style>