'use client'
import React from 'react'
import UserNav from './_components/UserNav'
import LoginConditionalWrapper from '../../shared/components/LoginConditionalWrapper'
import styles from './page.module.scss'
import UserBasic from './_components/UserBasic'

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <LoginConditionalWrapper
      loadingClassName={styles.loginWrapperBox}
      notLoggedClassName={styles.loginWrapperBox}
    >
      <div className={styles.navBox}>
        <UserNav />
      </div>

      <div className={styles.userContent}>
        <UserBasic />

        <div className={styles.userChildContent}>
          {children}
        </div>
      </div>
    </LoginConditionalWrapper>
  )
}
