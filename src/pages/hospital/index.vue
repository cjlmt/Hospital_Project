<template>
  <div class="hospital">
    <!-- 左侧导航区 -->
    <div class="menu">
      <div class="top">
        <el-icon>
          <HomeFilled />
        </el-icon>
        <p>/ 医院信息</p>
      </div>
      <!-- 会自动取value -->
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo">
        <el-menu-item index="/hospital/register" @click="changeActive('/hospital/register')">
          <el-icon>
            <Document />
          </el-icon>
          <span>预约挂号</span>
        </el-menu-item>
        <el-menu-item index="/hospital/detail" @click="changeActive('/hospital/detail')">
          <el-icon>
            <Location />
          </el-icon>
          <span>医院详情</span>
        </el-menu-item>
        <el-menu-item index="/hospital/notice" @click="changeActive('/hospital/notice')">
          <el-icon>
            <Setting />
          </el-icon>
          <span>预约须知</span>
        </el-menu-item>
        <el-menu-item index="/hospital/close" @click="changeActive('/hospital/close')">
          <el-icon>
            <InfoFilled />
          </el-icon>
          <span>停诊信息</span>
        </el-menu-item>
        <el-menu-item index="/hospital/search" @click="changeActive('/hospital/search')">
          <el-icon>
            <Search />
          </el-icon>
          <span>查询/取消</span>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 右侧路由组件展示区 -->
    <div class="display">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Document,
  Location,
  Setting,
  Search,
  InfoFilled,
  HomeFilled
} from '@element-plus/icons-vue'
// 引入路由器创建函数
import { useRouter, useRoute } from 'vue-router'
//创建路由器对象
let $router = useRouter()
//创建当前路由对象
// 获取当前路径，确定是那个路由组件从而确定是哪个导航项高亮
let $route = useRoute()
// 引入组合式API
import { onMounted } from 'vue';
// 引入发送请求的方法
import { useDetailStore } from '../../store/modules/hospitalDetail'
let detailStore = useDetailStore()
const changeActive = (path: string) => {
  //参数！！！
  $router.push({ path: path, query: { hoscode: $route.query.hoscode } })
}
onMounted(() => {
  console.log($route.query.hoscode);
  // pinia发送请求将数据存在仓库中
  detailStore.getHospital($route.query.hoscode as any)
  // detailStore.getHospital($route.query.hoscode);
})
</script>

<style scoped lang="scss">
.hospital {
  display: flex;

  .menu {
    flex: 2;

    .top {
      font-size: 13px;
      color: gray;
      margin: 20px 0 10px;
      display: flex;
      align-items: center;

      p {
        margin-left: 5px;
      }
    }

    .list {
      font-size: 14px;
      color: black;

      li {
        display: flex;
        align-items: center;

        span {
          margin-left: 5px;
        }
      }
    }
  }

  .display {
    flex: 8;
  }

}
</style>