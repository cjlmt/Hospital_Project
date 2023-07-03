<template>
    <el-card shadow="hover">
        <div class="content">
            <div class="left">
                <div class="name">
                    {{ hospitalInfo?.hosname }}
                </div>
                <div class="detail">
                    <div class="level">
                        <svg t="1688349968591" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="1601" width="16" height="16">
                            <path
                                d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z"
                                p-id="1602"></path>
                        </svg>
                        <span>{{ hospitalInfo?.param?.hostypeString }}</span>
                    </div>
                    <div class="time">
                        <svg t="1688350025757" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="2786" width="16" height="16">
                            <path
                                d="M511.913993 63.989249c-247.012263 0-447.924744 200.912481-447.924744 447.924744s200.912481 447.924744 447.924744 447.924744 447.924744-200.912481 447.924744-447.924744S758.926256 63.989249 511.913993 63.989249zM511.913993 895.677474c-211.577356 0-383.763481-172.186125-383.763481-383.763481 0-211.577356 172.014111-383.763481 383.763481-383.763481s383.763481 172.014111 383.763481 383.763481S723.491349 895.677474 511.913993 895.677474z"
                                fill="#575B66" p-id="2787"></path>
                            <path
                                d="M672.05913 511.913993l-159.973123 0L512.086007 288.123635c0-17.717453-14.277171-32.166639-31.994625-32.166639-17.717453 0-31.994625 14.449185-31.994625 32.166639l0 255.956996c0 17.717453 14.277171 31.994625 31.994625 31.994625l191.967747 0c17.717453 0 32.166639-14.277171 32.166639-31.994625C704.053754 526.191164 689.604569 511.913993 672.05913 511.913993z"
                                fill="#575B66" p-id="2788"></path>
                        </svg>
                        <span>每天{{ hospitalInfo?.bookingRule?.releaseTime }}放号</span>
                    </div>
                </div>
            </div>
            <div class="right">
                <!-- <img src="@/assets/images/logo.png"> -->
                <img :src="'data:image/jpeg;base64,' + hospitalInfo?.logoData">
            </div>
        </div>
    </el-card>
</template>

<script setup lang="ts">
// 接收父组件传递过来的props->即为已有的医院的数据
defineProps(['hospitalInfo'])
</script>

<style scoped lang="scss">
.content {

    display: flex;
    justify-content: space-between;

    .left {
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 60%;


        .name {
            font-size: 16px;
        }

        .detail {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            color: gray;

            .level,
            .time {
                display: flex;
                align-items: center;

                span {
                    margin-left: 5px;
                    margin-top: 2px;
                }
            }
        }
    }

    .right {
        img {
            width: 50px;
            height: 50px;
        }
    }
}
</style>