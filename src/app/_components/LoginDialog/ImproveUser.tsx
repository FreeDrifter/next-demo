import { Button, Form, Input, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { UserInfo, UserImproveParams, improveUserInfo } from '../../../shared/apis/user'
import { useObjState } from '@/shared/utils/common'
import { Rule } from 'antd/es/form'
import { englishNickNameValidator, nickNameValidator, passwordValidator } from '@/shared/utils/validator'
import { useState } from 'react'
import { to } from '@/shared/utils/to'
import { DialogProps, DialogWrap } from '@/shared/utils/dialog'

type ImproveUserProps = {
  user: UserInfo
}

export default function ImproveUserInfo({ user, onClose }: ImproveUserProps & DialogProps) {
  const [form] = useForm()
  const [improveInfo, setImproveInfo] = useObjState<UserImproveParams>(getDefaultImproveParams(user))
  const [isSaving, setSaving] = useState(false)

  const rules = getImproveRules(improveInfo)

  async function onImproveInfoSave() {
    const [formErr] = await to(form.validateFields())
    if (formErr) return

    setSaving(true)
    const [reqErr] = await to(improveUserInfo(improveInfo))
    setSaving(false)
    if (reqErr) return
    
    message.success('完善信息成功')
    onClose && onClose()
  }

  // 完善信息 昵称、英文昵称、密码、确认密码. 调用修改信息接口
  return (
    <DialogWrap footer={null} width={`440px`}>
      <div className="mc-login-root">
        <div className='mc-login-form-box'>
          <h3>完善信息</h3>

          <Form
            className='mc-login-form' form={form}
          >
            {/* 昵称 */}
            <Form.Item
              name='name' className='mc-login-form-item'
              rules={[rules.name]}
            >
              <Input
                value={improveInfo.name}
                onChange={(e) => setImproveInfo('name', e.target.value)}
                placeholder='请输入用户昵称'
                className='mc-login-form-input'
              />
            </Form.Item>

            {/* 英文昵称 */}
            <Form.Item
              name="ename" className='mc-login-form-item'
              rules={[rules.ename]}
            >
              <Input
                value={improveInfo.ename} placeholder='请输入英文昵称'
                onChange={(e) => setImproveInfo('ename', e.target.value)}
                className='mc-login-form-input'
              />
            </Form.Item>

            {/* 密码 */}
            <Form.Item
              name="password" className='mc-login-form-item'
              rules={[rules.passwrod]}
            >
              <Input.Password
                value={improveInfo.passwrod} placeholder='请输入密码'
                onChange={(e) => setImproveInfo('passwrod', e.target.value)}
                className='mc-login-form-input'
              />
            </Form.Item>

            {/* 密码二次确认 */}
            <Form.Item
              name="passwordConfirm" className='mc-login-form-item'
              rules={[rules.passwordConfirm]}
            >
              <Input.Password
                value={improveInfo.passwordConfirm} placeholder='请确认密码'
                onChange={(e) => setImproveInfo('passwordConfirm', e.target.value)}
                className='mc-login-form-input'
              />
            </Form.Item>

            <Form.Item name="loginBtn">
              <Button
                className='mc-login-form-submit-btn'
                type="primary" block loading={isSaving}
                onClick={onImproveInfoSave}
              >
                保存
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </DialogWrap>
  )
}

function getImproveRules(params: UserImproveParams) {
  return {
    name: { validator: nickNameValidator },
    ename: { validator: englishNickNameValidator },
    passwrod: { validator: passwordValidator },
    passwordConfirm: {
      validator(rule: unknown, value: string) {
        if (value !== params.passwrod) {
          return Promise.reject(new Error('两次密码输入不一致，请重新输入'))
        }
        return passwordValidator(rule, value)
      },
    }
  }
}

function getDefaultImproveParams(user: UserInfo): UserImproveParams {
  return {
    id: user.id,
    name: user.name || '',
    ename: user.ename || '',
    passwrod: '',
    passwordConfirm: '',
  }
}