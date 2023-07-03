<template>
  <div class="search">
    <el-autocomplete clearable class="inline-input w-50" placeholder="请输入医院名称" />
    <el-button type="primary" size="default" :icon="Search"></el-button>
  </div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
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