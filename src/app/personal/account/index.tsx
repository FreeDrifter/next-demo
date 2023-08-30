'use client'
/* 用户信息 */
import UserAuth from './_components/UserAuth'
import UserInfoView from './_components/UserInfoView'
import styles from './index.module.scss'

export default function UserAccountPage() {
  return (
    <div className={styles.accountRoot}>
      <UserInfoView />
      <UserAuth />
    </div>
  )
}