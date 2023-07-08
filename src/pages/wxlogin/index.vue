<template>
    <div>

    </div>
</template>

<script setup lang="ts">
// 该组件由于路由传参有了用户数据，现在要持久化存储
import { SET_TOKEN } from '../../utils/user'
// 获取用户信息
import { useRoute } from 'vue-router'
// 获取路由对象
let $route = useRoute()

// 持久化存储用户信息
SET_TOKEN(JSON.stringify($route.query))
// 获取用户信息，iframe重定向到该路由组件，可是不需要它出现
let html: any = document.querySelector('html')
html.style.display = 'none'
</script>

<style scoped></style>