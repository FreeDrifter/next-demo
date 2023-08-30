import { Button, FormInstance, Input, InputNumber, Space, message } from 'antd'
import { LoginProps, LoginType, useSendSMS } from './_helper'
import { useState } from 'react'
import { ForgotPasswordParams, PhoneCodeType, resetPassword as resetPasswordAPI } from '@/shared/apis/login'
import { noop, useObjState } from '@/shared/utils/common'
import { to } from '@/shared/utils/to'
import Form, { Rule } from 'antd/es/form'
import { passwordValidator, validatePhone } from '@/shared/utils/validator'

const FormItem = Form.Item

export default function ForgotPassword(props: LoginProps) {
  const { setLoginType = noop } = props
  const [form] = Form.useForm()
  
  // 重置密码逻辑
  const {
    resetParams,
    setResetParams,
    isReseting,
    resetPassword
  } = useResetPassword(form, props)

  // 发送验证码逻辑
  const {
    isSMSSending,
    startSendSMS,
    countdownText
  } = useSendSMS(form)

  // 表单校验规则
  const rules = getResetRules(resetParams)

  return (
    <div className="mc-login-form-box mc-reset-password-box">
      <h3>重置密码</h3>

      <Form
        form={form}
        className="mc-login-form"
      >
        {/* 手机号 */}
        <FormItem
          className="mc-login-form-item" name="phone"
          rules={[rules.phone]}
        >
          <InputNumber
            value={resetParams.phone}
            onChange={(val) => setResetParams('phone', val)}
            className='mc-login-form-input'
            placeholder='请输入手机号' controls={false}
          />
        </FormItem>

        {/* 验证码 */}
        <Space className='mc-login-form-item'>
          <FormItem name='phoneCode' className="mb-0">
            <Input
              value={resetParams.phoneCode}
              onChange={(e) => setResetParams('phoneCode', e.target.value)}
              className='mc-login-form-input'
              placeholder='请输入验证码'
            />
          </FormItem>
          <Button
            type="link" className="mc-login-form-right-btn"
            disabled={isSMSSending}
            onClick={() => startSendSMS({
              phone: resetParams.phone,
              type: PhoneCodeType.RESET_PASSWORD
            })}
          >
            {
              isSMSSending
                ? <span>{countdownText}</span>
                : <span className="mc-login-form-sms-btn">获取验证码</span>
            }
          </Button>
        </Space>


        {/* 密码 */}
        <FormItem
          className="mc-login-form-item" name="password"
          rules={[rules.password]}
        >
          <Input.Password
            value={resetParams.password}
            onChange={(e) => setResetParams('password', e.target.value)}
            className="mc-login-form-input" placeholder="请输入新密码"
          />
        </FormItem>

        {/* 密码二次确认 */}
        <FormItem
          className="mc-login-form-item" name="passwordConfirm"
          rules={[rules.passwordConfirm]}
        >
          <Input.Password
            value={resetParams.passwordConfirm}
            onChange={(e) => setResetParams('passwordConfirm', e.target.value)}
            className="mc-login-form-input" placeholder='请确认新密码'
          />
        </FormItem>

        {/* 登录/注册 按钮 */}
        <FormItem name="loginBtn">
          <Button
            className='mc-login-form-submit-btn'
            type="primary" block
            loading={isReseting}
            onClick={resetPassword}
          >
            提交
          </Button>
        </FormItem>
      </Form>

      <div className="mc-login-reset-sms-btn">
        <span onClick={() => setLoginType(LoginType.SMS)}>验证码登录</span>
      </div>
    </div>
  )
}

function useResetPassword(form: FormInstance, props: LoginProps) {
  const [resetParams, setResetParams] = useObjState<ForgotPasswordParams>({
    phone: '',
    phoneCode: '',
    password: '',
    passwordConfirm: ''
  })
  const [isReseting, setIsReseting] = useState(false)

  async function resetPassword() {
    const [formErr] = await to(form.validateFields())
    if (formErr) {
      return // 前端校验不通过 (界面相关位置自动提示) 
    }

    setIsReseting(true)
    const [reqErr] = await to(resetPasswordAPI(resetParams))
    setIsReseting(false)

    if (reqErr) {
      return message.error(reqErr.message)
    }
    message.success('重置密码成功')
    props.setLoginType && props.setLoginType(LoginType.PASSWORD)
  }

  return {
    resetParams,
    setResetParams,

    isReseting,

    resetPassword,
  }
}

// 重置密码的表单规则项, 统一设置
function getResetRules(resetParams: ForgotPasswordParams): Record<keyof ForgotPasswordParams, Rule> {
  return {
    phone: {
      validator(rule: unknown, value: string) {
        if (!value) {
          return Promise.reject(new Error('请输入手机号'))
        }
        if (!validatePhone(value)) {
          return Promise.reject(new Error('请输入正确的手机号'))
        }
        return Promise.resolve()
      },
    },
    phoneCode: {
      validator(rule: unknown, value: string) {
        if (!value) {
          return Promise.reject(new Error('请输入验证码'))
        }
        return Promise.resolve()
      }
    },
    password: {
      validator: passwordValidator,
    },
    passwordConfirm: {
      validator(rule: unknown, value: string) {
        if (value !== resetParams.password) {
          return Promise.reject(new Error('两次密码输入不一致，请重新输入'))
        }
        return passwordValidator(rule, value)
      }
    }
  }
}