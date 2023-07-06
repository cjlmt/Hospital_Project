import type { HospitalDetail, DepartmentArr, UserInfo } from "@/api/hospital/type";
//定义仓库内部存储数据的state的ts类型
export interface DetailState {
    hospitalInfo: HospitalDetail,
    department: DepartmentArr
}

// 用户仓库相关state数据的ts类型定义
export interface UserState {
    // 用于控制登录组件的dialog显示于隐藏
    visiable: boolean,
    // 存储用户的验证码
    code: string,
    userInfo: UserInfo
}