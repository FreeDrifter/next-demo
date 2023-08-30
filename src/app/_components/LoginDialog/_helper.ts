import { PhoneCodeParams, sendPhoneCode } from '@/shared/apis/login'
import { UserInfo } from '@/shared/apis/user'
import { to } from '@/shared/utils/to'
import { MiChongPasswordRuleMsg, validateMiChongPassword, validatePhone } from '@/shared/utils/validator'
import { FormInstance, message } from 'antd'
import { useEffect, useState } from 'react'

export type LoginProps = {
  setLoginType?: (type: LoginType) => void
  onSuccess?: (userInfo: UserInfo) => void
}

export enum LoginType {
  SMS, // 验证码登录
  PASSWORD, // 密码登录
  FORGOT_PASSWORD, // 忘记密码
}

export function useSendSMS(phoneForm: FormInstance) {
  const SMSWaitTime = 60 * 1000 // 60s

  const [isSMSSending, setSMSSending] = useState(false)
  const [smsCountdown, setSmsCountdown] = useState(0)
  const [countdownText, setCountdownText] = useState('')

  useEffect(() => {
    const text = (SMSWaitTime - smsCountdown) / 1000 + '秒后重新发送'
    setCountdownText(text)
  }, [smsCountdown, SMSWaitTime])

  async function startSendSMS(phoneParams: PhoneCodeParams) {
    const [formErr] = await to(phoneForm.validateFields(['phone']))
    if (formErr) {
      return // 前端手机号校验不通过
    }

    stopSendSMS() // 重置状态

    // 调用后端发送验证码 api
    sendPhoneCode(phoneParams).catch(err => {
      message.error(err.message)
      stopSendSMS()
    })

    setSMSSending(true)
    startTimeout()

    function startTimeout() {
      setSmsCountdown((count) => {
        const newCount = count + 1 * 1000

        if (newCount > SMSWaitTime) {
          stopSendSMS()
        } else {
          setTimeout(startTimeout, 1000) // 间隔 1s 倒计时
        }
        return newCount
      })

    }
  }

  function stopSendSMS() {
    setSmsCountdown(0)
    setSMSSending(false)
  }

  return {
    isSMSSending,
    countdownText,

    startSendSMS,
  }
}
