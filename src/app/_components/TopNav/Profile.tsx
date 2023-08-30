'use client'

import { Button, Popover } from 'antd'
import styles from './index.module.scss'
import { loadDialog } from '@/shared/utils/dialog'
import LoginDialog from '../LoginDialog'
import { useUserContext } from '@/shared/helper/userProvider'
import Image from 'next/image'
import { UserInfo } from '@/shared/apis/user'
import Link from 'next/link'

export default function Profile() {
  const { isLoggedIn } = useUserContext()
  return isLoggedIn ? <ProfileDisplay /> : <LoginBtnDisplay />
}

function ProfileDisplay() {
  const userContext = useUserContext()
  const userInfo = userContext.userInfo as UserInfo

  const dropdownContent = (
    <div className={styles.profileMenuList}>
      <Link className={styles.menuUser} href={'/personal'}>
        <Image className={`${styles.profileAvatar} rounded-full`} src={userInfo?.avatar?.url} alt='用户头像' width={36} height={36} />
        <span>{userInfo.name}</span>
      </Link>

      {/* 退出登录按钮 */}
      <div className={styles.profileMenu} onClick={userContext.clearUser}>
        <i className="iconfont icon-tuichu" />
        <span>退出登录</span>
      </div>
    </div>
  )

  return (
    <Popover className={styles.profileBox} content={dropdownContent} overlayClassName={styles.dropdownInnerBox}>
      <Image className={`${styles.profileAvatar} rounded-full`} src={userInfo?.avatar?.url} alt='用户头像' width={36} height={36} />
    </Popover>
  )
}

function LoginBtnDisplay() {
  function onLoginBtnClick() {
    loadDialog(LoginDialog)
  }

  return (
    <Button
      className={`${styles.loginBtn} ${styles.profileBox}`}
      type="primary"
      onClick={onLoginBtnClick}
    >
      登录
    </Button>
  )
}
