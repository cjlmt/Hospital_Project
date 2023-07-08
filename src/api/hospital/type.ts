
//定义医院详情模块数据的ts类型
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

//代表医院详细数据的类型
export interface HospitalDetail {
    "bookingRule": {
        "cycle": number,
        "releaseTime": string,
        "stopTime": string,
        "quitDay": number,
        "quitTime": string,
        "rule": string[]
    },
    "hospital": {
        "id": string,
        "createTime": string,
        "updateTime": string,
        "isDeleted": number,
        "param": {
            "hostypeString": string,
            "fullAddress": string
        },
        "hoscode": string,
        "hosname": string,
        "hostype": string,
        "provinceCode": string,
        "cityCode": string,
        "districtCode": string,
        "address": string,
        "logoData": string,
        "intro": null,
        "route": string,
        "status": number,
        "bookingRule": null
    }
}

//医院详情返回数据
export interface HospitalDetailResponseData extends ResponseData {
    data: HospitalDetail
}

//代表医院科室的数据
export interface Department {
    "depcode": string,
    "depname": string,
    "children"?: Department[]
}

// 代表存储科室数组类型
export type DepartmentArr = Department[]

//获取科室接口返回的数据类型
export interface DepartmentResponseData extends ResponseData {
    data: DepartmentArr
}

// 用户登录接口需要的参数类型
export interface LoginData {
    phone: string,
    code: string
}

// 登录接口返回的用户信息数据
export interface UserInfo {
    name: string,
    token: string
}

// 登录接口返回的数据的ts类型
export interface UserLoginResponseData extends ResponseData {
    data: UserInfo
}

//定义微信扫码登录返回的数据的ts类型
export interface WXLogin {
    "redirectUri": string,
    "appid": string,
    "scope": string,
    "state": string
}
// 定义微信扫码参数接口返回数据的ts类型
export interface WXLoginResponseData extends ResponseData {
    data: WXLogin
}

// 
export interface WorkData {
    "workDate": string,
    "workDateMd": string,
    "dayOfWeek": string,
    "docCount": number,
    "reservedNumber": number,
    "availableNumber": number,
    "status": number
}

export type BookingScheduleList = WorkData[]

export interface BaseMap {
    "workDateString": string,
    "releaseTime": string,
    "bigname": string,
    "stopTime": string,
    "depname": string,
    "hosname": string
}

export interface HospitalWorkData extends ResponseData {
    data: {
        "total": number,
        "bookingScheduleList": BookingScheduleList,
        "baseMap": BaseMap
    }
}