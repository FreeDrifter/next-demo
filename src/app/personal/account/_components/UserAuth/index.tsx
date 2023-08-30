'use client'
import { Button } from 'antd'
import styles from './index.module.scss'

export default function UserAuth() {
  return (
    <div className={styles.authRoot}>
      <div className={styles.titleBox}>
        <h3>认证信息</h3>
        <Button type='link' className={styles.editBtn}>编辑</Button>
      </div>

      <div className={styles.contentBox}>
        <div className={styles.contentItem}>
          <label>犬舍:</label>
          <span>已认证</span>
        </div>
      </div>
    </div>
  )
}