import type { HospitalDetail, DepartmentArr } from "@/api/hospital/type";
//定义仓库内部存储数据的state的ts类型
export interface DetailState {
    hospitalInfo: HospitalDetail,
    department: DepartmentArr
}