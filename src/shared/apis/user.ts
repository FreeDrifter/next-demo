import { md5 } from '@/shared/utils/crypto'
import { apiFetch } from '@/shared/utils/request'
import { ImageInfo } from './common'
import { SessionStore } from '@/shared/utils/storage'

// 用户性别
export enum UserSex {
  MALE = 'NAN',
  FEMALE = 'NU'
}

export const UserSexOptions = [
  { label: '男', value: UserSex.MALE },
  { label: '女', value: UserSex.FEMALE }
]

// 是否认证
export enum Authentication {
  YES = 'YES',
  NO = 'NO'
}

export type { ImageInfo }

export type UserInfo = {
  id: string
  address: string //	用户地址
  area: string // 区
  areaId: number	// 区ID
  avatar: ImageInfo //	用户头像
  backImg: string // 身份证后照片
  birthData: string // 出生日期
  certificateEndTime: string // 证件有效结束时间
  certificateFailReason: string
  certificateNo: string //	证件号	
  certificateStartTime: string //	证件有效开始时间
  certificateType: string // 证件类型,可用值:ID_CARD,PASSPORT
  city: string // 市	
  cityId: number // 市ID
  country: string // 国家
  countryId: number //国家ID
  createBy: string // 创建人
  createTime: string // 创建时间
  email: string // 电子邮件
  ename: string // 用户英文名
  ext: string // 扩展字段
  frontImg: string // 身份证前照片
  isAuthentication: {
    code: Authentication
  } // 是否认证 是-YES NO-否,可用值:NO,YES
  lastLoginTime: string // 最后登陆时间
  lastLoginType: string // 最后登陆方式,可用值:PASSWORD_LOGIN,PHONE_LOGIN	
  memberSignature: string // 个人签名	
  memberStatus: string // 会员状态 正常NORMAL冻结FREEZE 注销LOGOUT 删除DEL,可用值:DEL,FREEZE,LOGOUT,NORMAL	
  memberType: string // 用户类型 普通ORDINARY 专业SPECIALTY,可用值:ORDINARY,SPECIALTY	
  name: string // 用户姓名
  phone: string // 手机号
  province: string // 省
  provinceId: number // 省ID
  roleIds: string[] // 用户角色列表
  salt: string // 盐值
  sex: string // 性别 1：男 2:女
  trueName: string // 真实姓名
  updateBy: string // 修改人
  updateTime: string // 修改时间
  websiteAddress: string // 网站地址
  wecahtUnionid: string // 微信用户唯一id
  wechatOpenid: string // 微信号
  token: string
  isPassWord: boolean
}

/* 缓存用户信息处理器 */
export const {
  fetchCachedUserInfo,
  getCachedUserInfo,
  setCahcedUserInfo,
  clearCachedUserInfo,
} = (() => {
  const USER_STORE_KEY = 'USER_INFO'

  let userInfoCache: UserInfo | null = SessionStore.get(USER_STORE_KEY) as UserInfo || (JSON.parse(`{"code":"0","msg":"成功","responseTime":"2023-08-30 22:08:57","data":{"id":19,"roleIds":null,"memberType":"ORDINARY","memberStatus":"NORMAL","name":"小果和大八","ename":"AppleEight","address":"北京市昌平区牛人街","avatar":{"url":"http://img.dongdongdong.xyz/1692435663166-36307-飞书20230322-164340 (1)_549x549.jpg","cover":false,"width":null,"high":null,"size":null},"coverImage":null,"memberSignature":null,"websiteAddress":"https://www.5i5j.com","certificateType":"ID_CARD","certificateNo":"","trueName":"张晓八","frontImg":null,"backImg":null,"certificateStartTime":"2023-08-01 00:00:00","certificateEndTime":"2023-09-07 00:00:00","isAuthentication":"YES","certificateFailReason":"1","country":null,"countryId":null,"province":null,"provinceId":null,"city":null,"cityId":null,"area":null,"areaId":null,"sex":"NU","phone":"13121266932","birthData":null,"wecahtUnionid":null,"wechatOpenid":"","email":"pingguo_xiaoba@ggxb.com","ext":"","lastLoginType":"PHONE_LOGIN","lastLoginTime":"2023-08-30 22:08:57","salt":null,"createTime":"2023-07-18 22:02:23","updateTime":"2023-08-19 17:27:44","createBy":"13121266932","updateBy":null,"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTksIm5hbWUiOiLlsI_mnpzlkozlpKflhasiLCJzdWIiOiJtY3pvb01lbWJlckluZm8iLCJleHAiOjE2OTM0MTE3MzcsImp0aSI6IjJjNTUxNzNjLWM0ODYtNGIyMC04NmI1LWM0M2JlNGVjNTY4ZiJ9.akqLRdmd1Fe_voHD5-_x35_b51fJoSLi0COOWt_Zwsw","attention":null,"isPassWord":true,"footPrintCount":null,"visitorCount":null}}`)).data

  /**
   * 获取用户信息
   * 从缓存中获取用户信息，如果缓存中没有，就会通过网络请求获取
   */
  function fetchCachedUserInfo(): Promise<UserInfo> {
    if (userInfoCache) {
      return Promise.resolve(userInfoCache)
    }
    return getUserInfo().then(info => {
      // userInfoCache = info
      SessionStore.set(USER_STORE_KEY, info)
      return info
    })
  }

  /**
   * 仅获取已缓存的用户信息
   */
  function getCachedUserInfo() {
    return userInfoCache
  }

  function setCahcedUserInfo(userInfo: UserInfo) {
    userInfoCache = userInfo
    SessionStore.set(USER_STORE_KEY, userInfo)
  }

  function clearCachedUserInfo() {
    userInfoCache = null
    SessionStore.remove(USER_STORE_KEY)
  }

  return {
    fetchCachedUserInfo,
    getCachedUserInfo,
    setCahcedUserInfo,
    clearCachedUserInfo,
  }
})()


/**
 * 根据 id 获取用户信息
 * http://www.dongdongdong.xyz/web/doc.html#/default/MB-%E7%94%A8%E6%88%B7%E4%BF%A1%E6%81%AF/queryMemberInfoByIdUsingPOST
 */
export function getUserInfoById(): Promise<UserInfo> {
  return apiFetch('/web/member/login/queryMemberInfoById', {
    method: 'POST',
  })
}

export function getUserInfo(): Promise<UserInfo> {
  return apiFetch('/web/member/login/queryMemberInfoBytoken', {
    method: 'POST',
  })
}

// 完善用户信息参数
export type UserImproveParams = {
  ename: string
  name: string
  id: string
  passwrod: string
  passwordConfirm: string
}

/**
 * 完善用户信息参数
 */
export function improveUserInfo(params: UserImproveParams) {
  return apiFetch('/web/member/login/updateMemberLoginInfo', {
    method: 'POST',
    data: {
      ...params,
      passwrod: md5(params.passwrod).toString(),
      passwordConfirm: md5(params.passwordConfirm).toString(),
    }
  })
}

/**
 * 修改用户信息
 * http://www.dongdongdong.xyz/web/doc.html#/default/MB-%E7%94%A8%E6%88%B7%E4%BF%A1%E6%81%AF/updataMemberInfoUsingPOST
 */
export function modifyUserInfo(info: UserInfo) {
  return apiFetch('/web/member/login/updataMemberInfo', {
    method: 'POST',
    data: info,
  })
}

/**
 * 实名认证请求参数
 */
export interface VerificationParams {
  frontImg: ImageInfo; // 身份证正面
  backImg: ImageInfo; // 身份证反面
  certificateStartTime: string; // 证件有效开始时间
  certificateEndTime: string; // 证件有效结束时间
  certificateTime: string[];
  certificateNo: string; // 证件号
  certificateType: CertificateType; // 证件类型:PASSPORT-护照  ID_CARD-身份证
  id: number; // 用户 ID
  trueName: string; // 真实姓名
}

/**
* 证件类型:PASSPORT-护照  ID_CARD-身份证
*/
export enum CertificateType {
  IDCard = 'ID_CARD',
  Passport = 'PASSPORT',
}

export const CertificateTypeOptions = [
  { value: CertificateType.IDCard, label: '居民身份证' },
  { value: CertificateType.Passport, label: '护照' },
]


/**
 * 实名认证
 */
export function verificationIdentity(params: VerificationParams) {
  params.certificateStartTime = params.certificateTime[0]
  params.certificateEndTime = params.certificateTime[1]
  return apiFetch('/web/member/login/identityVerification', {
    method: 'POST',
    data: params
  })
}