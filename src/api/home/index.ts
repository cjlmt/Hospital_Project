// 统一管理首页模块的接口和请求函数
import request from "@/utils/request";
import { HospitalResponseData, HospitalaLevelAndRegionResponseData, HospitalInfo } from "./type";
// 通过枚举管理首页模块的接口地址
enum API {
    // 获取已有的医院的数据接口地址
    HOSPITAL_URL = '/hosp/hospital/',
    HOSPITALLEVELANDREGION_URL = '/cmn/dict/findByDictCode/',
    //根据关键字医院的名字获取数据
    HOSPITALINFO_URL = '/hosp/hospital/findByHosname/'
}
// 获取医院数据的发送请求的方法(执行发送操作并返回接收的结果)
export const reqHospital = (page: number, limit: number, hostype = '', districtCode = '') => request.get<any, HospitalResponseData>(API.HOSPITAL_URL + `${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`)
// 发送请求，获取医院的等级或者医院地区的数据
export const reqHospitalLevelAndRegion = (dictCode: string) => request.get<any, HospitalaLevelAndRegionResponseData>(API.HOSPITALLEVELANDREGION_URL + dictCode)
//根据关键字获取医院的数据进行展示
export const reqHospitalInfo = (hosname: string) => request.get<any, HospitalInfo>(API.HOSPITALINFO_URL + hosname)