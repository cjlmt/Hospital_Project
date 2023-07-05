<template>
    <div class="login_container">
        <el-dialog v-model="userStore.visiable" title="用户登录">
            123465
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
//获取user仓库的数据visiable，可以控制login组件的对话框显示与隐藏
import useUserStore from '../../store/modules/user'
//获取仓库对象，也就是存储数据的state
let userStore = useUserStore()
</script>

<script lang="ts">
export default {
    name: 'Login'
}
</script>

<style scoped lang="scss"></style>