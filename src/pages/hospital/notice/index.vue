<template>
    <div class="notice">
        <h1 class="head">{{ hospitalStore.hospitalInfo.hospital?.hosname }}预约挂号须知</h1>
        <div class="content">
            <p>为方便您早日就医康复，请您认真阅读预约挂号须知：</p>
            <ul class="outList">
                <li class="outListItem">
                    <span>一、预约实名制:</span>
                    <p>统一平台电话预约和网上预约挂号均采取实名制注册预约，请您如实提供就诊人员的真实姓名、有效证件号（身份证、护照）、性别、手机号码、社保卡号等基本信息。</p>
                </li>
                <li class="outListItem">
                    <span>二、预约挂号:</span>
                    <p>按照北京市卫健委统一平台要求，预约挂号规则如下：</p>
                    <ul class="inList">
                        <li>在同一自然日，同一医院，同一科室，同一就诊单元，同一就诊人，可以预约最多1个号源；</li>
                        <li>在同一自然周，同一就诊人，可以预约最多8个号源；</li>
                        <li>在同一自然月，同一就诊人，可以预约最多12个号源；</li>
                        <li>在同一自然季度，同一就诊人，可以预约最多24个号源。</li>
                    </ul>
                </li>
                <li class="outListItem">
                    <span>三、取消预约:</span>
                    <p>已完成预约的号源，如需办理退号，至少在就诊前一工作日14:00前通过网站、微信公众号、114电话等平台预约渠道进行取消预约。</p>
                </li>
                <li class="outListItem">
                    <span>四、爽约处理:</span>
                    <p>如预约成功后患者未能按时就诊且不办理取消预约号视为爽约，同一患者在自然年内爽约规则如下：</p>
                    <ul class="inList">
                        <li>累计爽约3次，自3次爽约日起，90天内不允许通过114平台进行预约挂号；</li>
                        <li>累计爽约6次，自6次爽约日起，180天内不允许通过114平台进行预约挂号。</li>
                    </ul>
                </li>
            </ul>
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
.notice {
    margin-top: 40px;
    margin-left: 40px;

    .head {
        font-size: 20px;
        font-weight: 900;
        text-align: center;
        margin-bottom: 20px;
    }

    .content {
        font-size: 14px;

        p {
            text-indent: 2em;
        }

        .outList {
            .outListItem {
                margin-top: 20px;

                span {
                    font-weight: 900;
                    font-size: 15px;
                }

                p {
                    margin-top: 20px;
                    margin-bottom: 20px;
                    line-height: 20px;
                }

                .inList {
                    list-style: disc;
                    // text-indent: 2em;
                    margin-left: 3em;

                    li {
                        margin-bottom: 5px;
                    }
                }
            }
        }
    }
}
</style>