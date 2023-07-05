import { defineStore } from 'pinia'
import { reqHospitalDetail } from '@/api/hospital'
import type { HospitalDetailResponseData, HospitalDetail } from '@/api/hospital/type'
import { DetailState } from './interface/index'
export const useDetailStore = defineStore('Detail', {
    state: (): DetailState => {
        return {
            //医院详情的数据
            hospitalInfo: {} as HospitalDetail
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