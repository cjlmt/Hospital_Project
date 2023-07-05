<template>
    <div class="detail">
        <!-- 医院标题和等级 -->
        <div class="top">
            <div class="name">{{ hospitalStore.hospitalInfo.hospital?.hosname }}</div>
            <div class="level">
                <svg t="1688475327785" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="9520" width="16" height="16">
                    <path
                        d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z"
                        p-id="9521"></path>
                </svg>
                <span>{{ hospitalStore.hospitalInfo.hospital?.param.hostypeString }}</span>
            </div>
        </div>
        <!-- 中间部分：logo和详细信息 -->
        <div class="content">
            <div class="left">
                <img :src="'data:image/jpeg;base64,' + hospitalStore.hospitalInfo.hospital?.logoData" alt="">
            </div>
            <div class="right">
                <div class="address">
                    <svg t="1688519651338" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="2437" width="16" height="16">
                        <path d="M512 512m-80 0a80 80 0 1 0 160 0 80 80 0 1 0-160 0Z" p-id="2438"></path>
                        <path
                            d="M960 480h-33.632C910.752 276.16 747.84 113.248 544 97.632V64a32 32 0 1 0-64 0v33.632C276.16 113.248 113.248 276.16 97.632 480H64a32 32 0 0 0 0 64h33.632C113.248 747.84 276.16 910.752 480 926.368V960a32 32 0 1 0 64 0v-33.632C747.84 910.752 910.752 747.84 926.368 544H960a32 32 0 1 0 0-64zM544 862.368V800a32 32 0 1 0-64 0v62.368C311.424 847.104 176.896 712.576 161.632 544H224a32 32 0 1 0 0-64H161.632C176.896 311.424 311.424 176.896 480 161.632V224a32 32 0 0 0 64 0V161.632c168.576 15.296 303.104 149.792 318.368 318.368H800a32 32 0 1 0 0 64h62.368c-15.264 168.576-149.792 303.104-318.368 318.368z"
                            p-id="2439"></path>
                    </svg>
                    <p>具体地址：{{ hospitalStore.hospitalInfo.hospital?.param.fullAddress }}</p>
                </div>
                <div class="route">规划路线：{{ hospitalStore.hospitalInfo.hospital?.route }}</div>
            </div>
        </div>
        <!-- 医院介绍 -->
        <div class="bottom">
            <h1 v-show="hospitalStore.hospitalInfo.hospital?.intro">医院介绍</h1>
            <p>{{ hospitalStore.hospitalInfo.hospital?.intro }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
//引入医院详情仓库的数据
import { useDetailStore } from '@/store/modules/hospitalDetail'
//获取仓库对象，也就是存储数据的state
let hospitalStore = useDetailStore()
</script>

<style scoped lang="scss">
.detail {
    margin-top: 40px;
    margin-left: 40px;

    .top {
        display: flex;

        .name {
            font-size: 25px;
        }

        .level {
            margin-top: -2px;
            margin-left: 10px;
            display: flex;
            align-items: center;
            color: gray;

            span {
                margin-left: 3px;
            }
        }
    }

    .content {
        display: flex;
        margin-top: 25px;


        .left {
            flex: 2;

            img {
                width: 100px;
                height: 100px;
                border-radius: 50%;
                margin-left: 15px;
            }
        }

        .right {
            color: gray;
            font-size: 14px;
            flex: 10;
            margin-top: 10px;

            div {
                margin-bottom: 10px;
            }

            .address {
                display: flex;
                align-items: center;
                position: relative;

                svg {
                    position: absolute;
                    top: 0;
                    left: -25px;
                    // margin-left: -20px;
                }

                p {
                    margin-top: 3px;
                }
            }

            .route {
                line-height: 25px;
            }
        }
    }

    .bottom {
        margin-top: 40px;
        font-size: 14px;

        h1 {
            margin-bottom: 10px;

        }

        p {
            color: gray;
            line-height: 25px;
        }
    }
}
</style>