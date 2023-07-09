//引入二次封装的axios对象，使用它来发送请求
import request from '@/utils/request'
import type { DoctorResponseData, HospitalDetailResponseData, DepartmentResponseData, LoginData, UserLoginResponseData, WXLoginResponseData } from './type'
//枚举请求地址
enum API {
    HOSPITALDETAIL_URL = '/hosp/hospital/',
    //获取某一个医院的科室的数据
    HOSPITALDEPARTMENT_URL = 'hosp/hospital/department/',
    // 获取验证码接口
    GETUSERCODE_URL = '/sms/send/',
    // 用户登录接口
    USERLOGIN_URL = '/user/login',
    // 获取微信扫码登录需要参数
    WXLOGIN_URL = '/user/weixin/getLoginParam/',
    // 获取某一个医院的某一个科室预约挂号数据
    HOSPITALWORK_URL = '/hosp/hospital/auth/getBookingScheduleRule/',
    // 获取医院某一个科室某一天相应医生排班的数据
    HOSPITALDOCTOR_URL = 'hosp/hospital/auth/findScheduleList/'
}
//获取医院详情的接口
export const reqHospitalDetail = (hoscode: string) => request.get<any, HospitalDetailResponseData>(API.HOSPITALDETAIL_URL + hoscode)
// 获取医院科室的接口
export const reqHospitalDepartment = (hoscode: string) => request.get<any, DepartmentResponseData>(API.HOSPITALDEPARTMENT_URL + hoscode)
// 获取验证码接口
export const reqCode = (phone: string) => request.get<any, any>(API.GETUSERCODE_URL + phone)
// 用户登录接口
export const reqUserLogin = (data: LoginData) => request.post<any, UserLoginResponseData>(API.USERLOGIN_URL, data)

// 获取微信扫码登录生成二维码需要的参数接口请求方法
export const reqWxLogin = (wxRedirectUri: string) => request.get<any, WXLoginResponseData>(API.WXLOGIN_URL + '?wxRedirectUri=' + wxRedirectUri)
// 获取预约挂号的数据
export const reqHospitalWork = (page: number, limit: number, hoscode: string, depcode: string) => request.get<any, any>(API.HOSPITALWORK_URL + `${page}/${limit}/${hoscode}/${depcode}`)

// 获取医生排班的数据
export const reqHospitalDoctor = (hoscode: string, depcode: string, workDate: string) => request.get<any, DoctorResponseData>(API.HOSPITALDOCTOR_URL + `${hoscode}/${depcode}/${workDate}`)