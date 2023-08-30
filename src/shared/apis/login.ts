import { FetchCallOption, apiFetch } from '@/shared/utils/request'
import { UserInfo } from './user'
import { md5 } from '@/shared/utils/crypto'

export enum PhoneCodeType {
  LOGIN = 'LOGIN_REGERIST',
  RESET_PASSWORD = 'PASSWORD',
}

export type PhoneCodeParams = {
  phone: string
  type: PhoneCodeType
}

/**
 * 发送验证码
 * http://www.dongdongdong.xyz/web/doc.html#/default/MB-%E7%94%A8%E6%88%B7%E4%BF%A1%E6%81%AF/getPhoneCodeUsingPOST
 */
export function sendPhoneCode(params: PhoneCodeParams) {
  return apiFetch('/web/member/login/getPhoneCode', { method: 'POST', data: params, errorAlert: false })
}

export type PhoneLoginParams = {
  phone: string
  phoneCode: string
}

/**
 * 手机号登录
 * http://www.dongdongdong.xyz/web/doc.html#/default/MB-%E7%94%A8%E6%88%B7%E4%BF%A1%E6%81%AF/newPhoneLoginUsingPOST
 */
export function loginPhone(params: PhoneLoginParams): Promise<UserInfo> {
  return apiFetch('/web/member/login/userPhoneRegisterLogin', {
    method: 'POST',
    data: { ...params, type: PhoneCodeType.LOGIN }
  })
}

export type PasswordLoginParams = {
  phone: string
  password: string
} & FetchCallOption

/**
 * 账号密码登录
 * http://www.dongdongdong.xyz/web/doc.html#/default/MB-%E7%94%A8%E6%88%B7%E4%BF%A1%E6%81%AF/accountLoginUsingGET
 */
export function loginPassword(params: PasswordLoginParams): Promise<UserInfo> {
  return apiFetch('/web/member/login/phoneLogin', {
    ...params,
    method: 'POST',
    data: {
      phone: params.phone,
      password: md5(params.password).toString(),
    }
  })
}

export type ForgotPasswordParams = {
  phone: string
  phoneCode: string
  password: string
  passwordConfirm: string
}

/**
 * 忘记密码
 * http://www.dongdongdong.xyz/web/doc.html#/default/MB-%E7%94%A8%E6%88%B7%E4%BF%A1%E6%81%AF/checkMemberByPhoneUsingPOST
 */
export function resetPassword(params: ForgotPasswordParams) {
  return apiFetch('/web/member/login/updatePassword', {
    method: 'POST',
    data: {
      ...params,
      type: PhoneCodeType.RESET_PASSWORD,
      password: md5(params.password).toString(),
      passwordConfirm: md5(params.passwordConfirm).toString(),
    }
  })
}