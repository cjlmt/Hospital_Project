<template>
  <div class="bottom-container">
    <div class="content">
      <div class="left">京ICP备 13018369号 电话挂号010-56253825</div>
      <div class="right">
        <span>联系我们</span>
        <span>合作伙伴</span>
        <span>用户协议</span>
        <span>隐私协议</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.bottom-container {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  background-color: #f0f2f6;
  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 1200px;
    height: 50px;
    font-size: 14px;
    .left {
      color: gray;
    }
    .right {
      span {
        margin-left: 10px;
      }
    }
  }
}
</style>