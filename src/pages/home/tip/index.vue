<template>
    <div class="container">
        <!-- 定义常见科室的结构 department -->
        <div class="room">
            <div class="head">
                <div class="left">
                    常见科室
                </div>
                <div class="right">
                    全部 >
                </div>
            </div>
            <ul class="content">
                <li>神经内科</li>
                <li>消化内科</li>
                <li>呼吸内科</li>
                <li>内科</li>
                <li>神经外科</li>
                <li>妇科</li>
                <li>产科</li>
                <li>儿科</li>
            </ul>
        </div>
        <!-- 定义平台公告的结构 -->
        <div class="platform">
            <div class="head">
                <div class="left">
                    平台公告
                </div>
                <div class="right">
                    全部 >
                </div>
            </div>
            <ul class="content">
                <li>关于延长北京大学国际医院更新通知</li>
                <li>北京中医药大学东方医院部门更新通知</li>
                <li>武警总医院号源暂停更新通知通知</li>
            </ul>
        </div>
        <!-- 定义停诊公告的结构 -->
        <div class="stoptip">
            <div class="head">
                <div class="left">
                    停诊公告
                </div>
                <div class="right">
                    全部 >
                </div>
            </div>
            <ul class="content">
                <li>中国人民解放军总医院第六医院更新通知</li>
                <li>首都医科大学附属北京路河更新通知</li>
                <li>中日友好医院中西医结合心更新通知</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.container {
    font-size: 13px;
    color: gray;

    .room {
        margin-bottom: 10px;

        .head {
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
        }

        .content {
            // width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            li {
                width: 47%;
                margin-bottom: 10px;
            }
        }
    }

    .platform {
        margin-bottom: 20px;

        .head {
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
        }

        .content {
            li {
                margin-bottom: 10px;
                //溢出隐藏
                overflow: hidden;
                //超出部分显示形式
                text-overflow: ellipsis;
                //不换行
                white-space: nowrap;
                list-style: disc;

            }

            li::before {
                content: "";
                border-radius: 50%;
                margin-bottom: 2px;
                margin-right: 5px;
                width: 4px;
                height: 4px;
                background-color: orange;
                display: inline-block;
            }
        }
    }

    .stoptip {
        margin-bottom: 20px;

        .head {
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
        }

        .content {
            li {
                margin-bottom: 10px;
                //溢出隐藏
                overflow: hidden;
                //超出部分显示形式
                text-overflow: ellipsis;
                //不换行
                white-space: nowrap;
            }

            li::before {
                content: "";
                border-radius: 50%;
                margin-bottom: 2px;
                margin-right: 5px;
                width: 4px;
                height: 4px;
                background-color: skyblue;
                display: inline-block;
            }
        }
    }
}
</style>