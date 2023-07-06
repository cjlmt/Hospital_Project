<template>
    <div>
        <span>获取验证码({{ count }}s)</span>
    </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
// 定义响应式数据
let count = ref<number>(5)
//接收父组件传递过来的props->flag:用于控制倒计时的显示与隐藏
let props = defineProps(['flag'])
//监听父组件传递过来props数据变化
watch(
    () => props.flag,
    () => {
        // 开启定时器
        let timer = setInterval(() => {
            count.value--
            if (count.value <= 0) {
                // 清除定时器
                clearInterval(timer)
                //通知父组件不要再展示倒计时组件了,记得传入值
                $emit('getFlag', false)
            }
        }, 1000)
    },
    {
        immediate: true
    }
)
// 接收自定义事件
let $emit = defineEmits(['getFlag'])

//挂载后直接开启定时器的效果是一样的！！！
// onMounted(() => {
//     let timer = setInterval(() => {
//         count.value--
//         if (count.value <= 0) {
//             // 清除定时器
//             clearInterval(timer)
//             //通知父组件不要再展示倒计时组件了,记得传入值
//             $emit('getFlag', false)
//         }
//     }, 1000)
// })
</script>

<style scoped lang="scss"></style>