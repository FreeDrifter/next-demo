'use client'

import { DialogProps, DialogWrap, loadDialog } from '@/shared/utils/dialog'
import SMSLogin from './LoginSMS'
import './index.scss'
import { LoginType } from './_helper'
import PasswordLogin from './LoginPassword'
import ForgotPassword from './ForgotPassword'
import { useState } from 'react'
import { useUserContext } from '@/shared/helper/userProvider'
import { UserInfo } from '@/shared/apis/user'
import ImproveUserInfo from './ImproveUser'

export default function LoginDialog(props: DialogProps) {
  const { setUser } = useUserContext()
  const { LoginComponent, setLoginType } = useLoginType()

  function onLoginSuccess(user: UserInfo) {
    setUser?.(user)
    
    // 还未设置密码, 弹框设置密码
    if (!user.isPassWord) {
      loadDialog(ImproveUserInfo, { user })
    }

    props.onClose && props.onClose()
  }

  return (
    <DialogWrap
      width={`440px`}
      footer={null}
    >
      <div className="mc-login-root">
        <LoginComponent setLoginType={setLoginType} onSuccess={onLoginSuccess} />
      </div>
    </DialogWrap>
  )
}

function useLoginType() {
  const LoginTypeComponents = {
    [LoginType.PASSWORD]: PasswordLogin,
    [LoginType.SMS]: SMSLogin,
    [LoginType.FORGOT_PASSWORD]: ForgotPassword,
  }

  const [currentLoginType, setLoginType] = useState(LoginType.SMS)
  const LoginComponent = LoginTypeComponents[currentLoginType]

  return {
    LoginComponent,
    setLoginType,
  }
}