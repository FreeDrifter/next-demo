import { FormInstance, useForm } from 'antd/es/form/Form'
import { LoginProps, LoginType } from './_helper'
import { Button, Form, Input, InputNumber, Space, message } from 'antd'
import { useState } from 'react'
import { PasswordLoginParams, loginPassword } from '@/shared/apis/login'
import { to } from '@/shared/utils/to'
import OtherWays from './OtherWays'
import { noop } from '@/shared/utils/common'
import Agreements from './Agreements'
import { passwordValidator, getPhoneValidator } from '@/shared/utils/validator'

const { Item: FormItem } = Form

export default function PasswordLogin(props: LoginProps) {
  const { setLoginType = noop} = props

  // 表单(校验)
  const [form] = useForm()
  
  // 登录
  const {
    loginParams, setLoginParams,
    login, isLoging,
  } = usePasswordLogin(form, props)

  return (
    <div className='mc-login-form-box'>
      <h3>密码登录</h3>

      <Form
        className='mc-login-form'
        form={form}
      >

        {/* 用户名 */}
        <FormItem
          className='mc-login-form-item' name='phone'
          rules={[{ validator: getPhoneValidator() }]}
        >
          <InputNumber
            value={loginParams.phone}
            onChange={(val) => setLoginParams('phone', val)}
            className="mc-login-form-input" placeholder="请输入手机号" controls={false}
          />
        </FormItem>

        {/* 密码 */}
        <div className='mc-login-form-item'>
          <FormItem
            name='password' className='w-full mb-0 pr-28'
            rules={[{ validator: passwordValidator }]}
          >
            <Input.Password
              value={loginParams.password}
              onChange={(e) => setLoginParams('password', e.target.value)}
              className="mc-login-form-input mc-login-form-input-password"
              placeholder="请输入密码"
              visibilityToggle={false}
            />
          </FormItem>

          <Button
            type="link" className="mc-login-form-right-btn"
            onClick={() => setLoginType(LoginType.FORGOT_PASSWORD)}
          >
            忘记密码
          </Button>
        </div>
        
        <FormItem
          name="loginBtn"
        >
          <Button
            className="mc-login-form-submit-btn" type="primary" block
            loading={isLoging}
            onClick={login}
          >
            登录
          </Button>
        </FormItem>
      </Form>

      <OtherWays>
        <span
          className="cursor-pointer"
          onClick={() => setLoginType(LoginType.SMS)}
        >
          验证码登录
        </span>
      </OtherWays>

      <Agreements />
    </div>
  )
}

function usePasswordLogin(form: FormInstance, props: LoginProps) {
  const [loginParams, setParams] = useState<PasswordLoginParams>({ phone: '', password: '' })
  const [isLoging, setIsLoging] = useState(false)

  async function login() {
    const [formErr] = await to(form.validateFields())
    if (formErr) {
      return // 前端校验不通过 (界面相关位置自动提示)
    }

    setIsLoging(true)
    const [reqErr, userInfo] = await to(loginPassword({
      ...loginParams,
      errorAlert: false
    }))
    setIsLoging(false)
    
    if (reqErr) {
      message.error(reqErr.message)
    } else {
      props.onSuccess && props.onSuccess(userInfo)
    }
  }

  function setLoginParams<T extends keyof PasswordLoginParams>(key: T, val: PasswordLoginParams[T] | null) {
    setParams({ ...loginParams, [key]: val })
  }
  
  return {
    loginParams,
    isLoging,

    login,
    setLoginParams,
  }
}
