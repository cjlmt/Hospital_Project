import { defineStore } from 'pinia'
import { reqHospitalDetail } from '@/api/hospital'
import type { HospitalDetailResponseData } from '@/api/hospital/type'
export const useDetailStore = defineStore('Detail', {
    state: () => {
        return {
            //医院详情的数据
            hospitalInfo: {}
        }
    },
    actions: {
        //获取医院详情的方法
        async getHospital(hoscode: string) {
            let result: HospitalDetailResponseData = await reqHospitalDetail(hoscode)
            if (result.code == 200) {
                this.hospitalInfo = result.data
            }
        }
    },
    getters: {

    }
});
//获取仓库的方法对外暴露
//  default useDetailStore;