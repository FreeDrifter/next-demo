'use client'
import { useUserContext } from '@/shared/helper/userProvider'
import styles from './index.module.scss'
import { Button, Image } from 'antd'
import { loadDialog } from '@/shared/utils/dialog'
import UserVerificationDialog from '../UserVerificationDialog'
import { Authentication, UserInfo } from '@/shared/apis/user'

/**
 * 用户基本信息展示 (头像、用户名、访客、足迹、实名认证)
 */
export default function UserBasic() {
  const { userInfo, setUser } = useUserContext()

  if (!userInfo) return <div></div>

  // 打开认证弹框
  function openVerificationUserDialog() {
    loadDialog(UserVerificationDialog, {
      onSuccess: () => {
        // 认证成功
        setUser?.({ ...userInfo as UserInfo, isAuthentication: { code: Authentication.YES } })
      }
    })
  }

  return (
    <div>
      <div className={styles.userBack} />

      <div className={styles.accountInfo}>
        <div className={styles.accountBaseInfo}>
          <Image className="rounded-full" src={userInfo.avatar.url} alt='' preview={false} />
          <div className={styles.accountBasics}>
            <h6>{userInfo.name}</h6>
            {
              userInfo.memberSignature && <p>{userInfo.memberSignature}</p>
            }
          </div>
        </div>

        <div className={styles.accountRecords}>
          {/* todo cc 接口获取访客、足迹信息 */}
          <div className={styles.accountRecordItem}>
            <p>123</p>
            <p>访客</p>
          </div>
          <div className={styles.accountRecordItem}>
            <p>5</p>
            <p>足迹</p>
          </div>

          {
            // todo cc == YES 时, 是否需展示已认证
            (userInfo.isAuthentication?.code !== Authentication.YES)
              && <Button type='primary' onClick={openVerificationUserDialog}>实名认证</Button>
          }
        </div>
      </div>
    </div>
  )
}