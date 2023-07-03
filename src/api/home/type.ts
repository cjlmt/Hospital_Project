//专门用于定义ts类型的文件

//定义响应结果的类型
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

//定义单个医院数据的ts类型
export interface Hospital {
    id: string,
    createTime: string,
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
    "bookingRule": {
        "cycle": number,
        "releaseTime": string,
        "stopTime": string,
        "quitDay": number,
        "quitTime": string,
        "rule": [
            string,
            string
        ]
    }
}

// 定义已有医院数据的列表
export type Content = Hospital[]

// 定义接口返回的医院数据
export interface HospitalResponseData extends ResponseData {
    data: {
        "content": Content
        "pageable": {
            "sort": {
                "sorted": boolean,
                "unsorted": boolean,
                "empty": boolean
            },
            "pageNumber": number,
            "pageSize": number,
            "offset": number,
            "paged": boolean,
            "unpaged": boolean
        },
        "totalPages": number,
        "totalElements": number,
        "last": boolean,
        "first": boolean,
        "sort": {
            "sorted": boolean,
            "unsorted": boolean,
            "empty": boolean
        },
        "numberOfElements": number,
        "size": number,
        "number": number,
        "empty": boolean
    }
}

// 定义已有单个医院等级或者地区数据的ts类型
export interface HospitalaLevelAndRegion {
    "id": number,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {},
    "parentId": number,
    "name": string,
    "value": string,
    "dictCode": Object,
    "hasChildren": Boolean
}

// 获取包裹这些数据的列表，也就是data的数据类型
export type HospitalaLevelAndRegionArr = HospitalaLevelAndRegion[]

// 获取等级或医院地区接口返回数据的类型
export interface HospitalaLevelAndRegionResponseData extends ResponseData {
    data: HospitalaLevelAndRegionArr
}