'use client'

import { Button } from 'antd'
import styles from './index.module.scss'
import { useUserContext } from '@/shared/helper/userProvider'
import { UserInfo, UserSexOptions } from '@/shared/apis/user'
import { loadDialog } from '@/shared/utils/dialog'
import { lazy } from 'react'
import { transOptionLabel } from '@/shared/utils/transform'

const UserEditDialog = lazy(() => import('./UserEditDialog'))

export const FormLayout = {
  labelCol: { xxl: 6, xl: 6, md: 8 },
  wrapperCol: { span: 22 }
}

export default function UserInfoView() {
  const { userInfo, setUser } = useUserContext()

  if (!userInfo) return

  const userShowingList: { label: string, key?: keyof UserInfo, value?: string }[] = [
    { label: '用户昵称', key: 'name' },
    { label: '英文昵称', key: 'ename' },
    { label: '性别', key: 'sex', value: transOptionLabel(userInfo.sex, UserSexOptions) },
    { label: '生日', key: 'birthData' },
    { label: '所在地区', value: `${userInfo.province || ''}${userInfo.city || ''}${userInfo.area || ''}` },
    { label: '网站地址', key: 'websiteAddress' },
    { label: '详细住址', key: 'address' },
    { label: '个性签名', key: 'memberSignature' },
  ]

  // 点击编辑弹框
  function onEditClick() {
    if (!userInfo) return

    loadDialog(UserEditDialog, {
      userInfo,
      onSuccess: setUser
    })
  }

  return (
    <div className={styles.editRoot}>
      <div className={styles.titleBox}>
        <h3>基本信息</h3>
        <Button type='link' className={styles.editBtn} onClick={onEditClick}>编辑</Button>
      </div>

      <div className={styles.contentBox}>
        {
          userShowingList.map(showingInfo => {
            return (
              <div className={styles.contentItem} key={showingInfo.label}>
                <label>{showingInfo.label}:</label>
                <span>{`${showingInfo.value || userInfo[showingInfo.key as keyof UserInfo] || ''}`}</span>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}