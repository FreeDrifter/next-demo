import { Button, Form, FormInstance, Input, InputNumber, Space, message } from 'antd'
import { LoginProps, LoginType, useSendSMS } from './_helper'
import OtherWays from './OtherWays'
import Agreements from './Agreements'
import { useState } from 'react'
import { PhoneCodeType, PhoneLoginParams, loginPhone, sendPhoneCode } from '@/shared/apis/login'
import { to } from '@/shared/utils/to'
import { noop } from '@/shared/utils/common'
import { getPhoneValidator } from '@/shared/utils/validator'

const { Item: FormItem } = Form

export default function SMSLogin(props: LoginProps) {
  const { setLoginType = noop } = props

  // 表单(校验)
  const [form] = Form.useForm()
  
  // 登录
  const {
    loginParams, setLoginParams,
    login, isLoging
  } = useSMSLogin(form, props)

  // 发送验证码
  const {
    isSMSSending,
    startSendSMS,
    countdownText
  } = useSendSMS(form)

  return (
    <div className='mc-login-form-box'>
      <h3>验证码登录</h3>
      
      {/* 表单 */}
      <Form
        className='mc-login-form'
        form={form}
      >
        
        {/* 手机号 */}
        <FormItem
          className='mc-login-form-item' name='phone'
          rules={[
            { validator: getPhoneValidator(), validateTrigger: 'onBlur' }
          ]}
        >
          <InputNumber
            value={loginParams.phone}
            onChange={(val) => setLoginParams('phone', val)}
            className='mc-login-form-input'
            placeholder='请输入手机号' controls={false}
          />
        </FormItem>

        {/* 验证码 */}
        
        <div className='mc-login-form-item'>
          <FormItem
            name='phoneCode' className='w-full pr-32 mb-0'
            rules={[{ required: true, message: '请输入验证码' }]}
          >
            <Input
              value={loginParams.phoneCode}
              onChange={(e) => setLoginParams('phoneCode', e.target.value)}
              className='mc-login-form-input'
              placeholder='请输入验证码'
            />
          </FormItem>
          <Button
            type="link" className="mc-login-form-right-btn"
            disabled={isSMSSending}
            onClick={() => startSendSMS({
              phone: loginParams.phone,
              type: PhoneCodeType.LOGIN
            })}
          >
            {
              isSMSSending
                ? <span>{countdownText}</span>
                : <span className="mc-login-form-sms-btn">获取验证码</span>
            }
          </Button>
        </div>

        {/* 登录/注册 按钮 */}
        <FormItem name="loginBtn">
          <Button
            className="mc-login-form-submit-btn"
            type="primary" block
            loading={isLoging}
            onClick={login}
          >
            登录/注册
          </Button>
        </FormItem>
        
      </Form>

      {/* 其他登录方式 */}
      <OtherWays>
        <span
          className="cursor-pointer"
          onClick={() => setLoginType(LoginType.PASSWORD)}
        >
          密码登录
        </span>
      </OtherWays>

      {/* 协议 */}
      <Agreements />
    </div>
  )
}

function useSMSLogin(form: FormInstance, props: LoginProps) {
  const [loginParams, setParams] = useState<PhoneLoginParams>({ phone: '', phoneCode: '' })
  const [isLoging, setIsLoging] = useState(false)

  async function login() {
    
    const [formErr] = await to(form.validateFields())
    if (formErr) {
      return // 前端校验不通过 (界面相关位置自动提示)
    }

    setIsLoging(true)
    const [reqErr, userInfo] = await to(loginPhone(loginParams))
    setIsLoging(false)

    if (reqErr) {
      message.error(reqErr.message)
    } else {
      // 通知父组件, 登录成功, 由父组件统一处理
      props.onSuccess && props.onSuccess(userInfo)
    }
  }

  function setLoginParams<T extends keyof PhoneLoginParams>(key: T, val: PhoneLoginParams[T] | null) {
    setParams({ ...loginParams, [key]: val })
  }

  return {
    loginParams,
    isLoging,

    login,
    setLoginParams,
  }
}
