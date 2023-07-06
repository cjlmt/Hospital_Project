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
        <!-- 如果没有用户名字，则显示登录注册 -->
        <div @click="login" class="login" v-if="!userStore.userInfo.name">登录注册</div>
        <!-- 如果由用户名字，则显示用户名字 -->
        <el-dropdown v-else class="me">
          <span class="el-dropdown-link">
            {{ userStore.userInfo.name }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>实名认证</el-dropdown-item>
              <el-dropdown-item>挂号订单</el-dropdown-item>
              <el-dropdown-item>就诊人管理</el-dropdown-item>
              <el-dropdown-item @click="signOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { UserInfo } from '@/api/hospital/type'
//创建路由器对象
let $router = useRouter()
//获取user仓库的数据visiable，可以控制login组件的对话框显示与隐藏
import useUserStore from '../../store/modules/user'
//获取仓库对象，也就是存储数据的state
let userStore = useUserStore()
const goHome = () => {
  //编程式导航跳转到首页
  $router.push({ path: '/home' })
}
// 点击登录与注册按钮的时候弹出对话框
const login = () => {
  userStore.visiable = true
}
// 点击退出登录的按钮回调
const signOut = () => {
  userStore.userInfo = {} as UserInfo
  // 并且login组件中手机的表单数据也应该清空
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

      .login:hover {
        cursor: pointer;
      }

      .me:hover {
        cursor: pointer;
      }
    }
  }
}
</style>