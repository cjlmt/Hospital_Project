<template>
    <div class="wrap">
        <!-- 顶部结构 -->
        <div class="top">
            <div class="hosname">北京人民医院</div>
            <div class="line"></div>
            <div class="BigDepname">专科</div>
            <div class="dot"></div>
            <div class="SmaDepname">多发性硬化专科门诊</div>
        </div>
        <!-- 中部 -->
        <div class="center">
            <h1>2023年06月</h1>
            <div class="container">
                <div class="item" v-for="item in 6" :key="item">
                    <div class="up">2023-06-0{{ item }}</div>
                    <div class="down">有号</div>
                </div>
            </div>
            <el-pagination layout="prev, pager, next" :total="50" />
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.wrap {
    margin-top: 40px;
    margin-left: 40px;

    .top {
        display: flex;
        color: gray;
        font-size: 14px;

        .line {
            width: 2px;
            height: 14px;
            background-color: gray;
            margin: 0 10px;
        }

        .dot {
            width: 2px;
            height: 2px;
            background-color: gray;
            border-radius: 50%;
            margin: 5px 10px 0;
        }
    }

    .center {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 50px;

        h1 {
            font-size: 14px;
            font-weight: bold;
            color: gray;
        }

        .container {
            display: flex;
            margin: 20px 0;
            width: 100%;

            .item {
                flex: 1;
                height: 80px;
                border: 1px solid skyblue;
                margin: 0 10px;
                display: flex;
                flex-direction: column;
                align-items: center;
                font-size: 14px;
                color: gray;

                .up {
                    height: 30px;
                    line-height: 30px;
                    background-color: #e5f3ff;
                    font-weight: bold;

                }

                .down {
                    height: 50px;
                    line-height: 50px;
                }

                div {
                    width: 100%;
                    text-align: center;
                }
            }
        }
    }
}
</style>