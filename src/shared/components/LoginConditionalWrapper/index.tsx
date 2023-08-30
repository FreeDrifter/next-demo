'use client'
import { useUserContext } from '@/shared/helper/userProvider'
import styles from './index.module.scss'
import { Button, Empty } from 'antd'
import DefaultEmptyImage from '@/imgs/status/empty.png'
import Image from 'next/image'
import { loadDialog } from '@/shared/utils/dialog'
import LoginDialog from '../../../app/_components/LoginDialog'

type LoginConditionalWrapperProps = {
  loadingClassName?: string
  notLoggedClassName?: string
  children: React.ReactNode
  loading?: () => React.ReactNode
  empty?: () => React.ReactNode
}

/**
 * 登录状态校验
 * 区分登录中、未登录、登录后状态
 * 登录后才会展示 children 内容
 */
export default function LoginConditionalWrapper(props: LoginConditionalWrapperProps) {
  const { isLoggedIn, isLoading } = useUserContext()

  // 已登录, 直接展示 children
  const loggedNode = <div>{props.children}</div>
  
  // 加载中
  const loadingNode = <LoginConditionalLoading {...props} />

  // 未加载
  const notLoggedNode = <LoginConditionalNotLogged {...props} />

  if (isLoading) {
    return loadingNode
  }

  return isLoggedIn ? loggedNode : notLoggedNode
}

function LoginConditionalLoading(props: LoginConditionalWrapperProps) {
  return (
    <div className={props.loadingClassName}>
      {
        props.loading
          ? props.loading()
          : (
            <video
              src={'/assets/video/loading.webm'} className={styles.loadingVideo}
              controls={false} autoPlay muted loop
            />
          )
      }
    </div>
  )
}

function LoginConditionalNotLogged(props: LoginConditionalWrapperProps) {
  if (props.empty) {
    return props.empty()
  }

  function openLoginDialog() {
    loadDialog(LoginDialog)
  }

  return (
    <div className={props.notLoggedClassName}>
      <Empty
        className={`${styles.emptyImageBox}`}
        image={(
          <Image src={DefaultEmptyImage.src} width={300} height={300} alt='empty' className={styles.emptyImage} />
        )}
        description={(
          <span className={styles.emptyDescription} onClick={openLoginDialog}>
            嗨！还未登录呢，快来登录继续探索吧
            </span>
        )}
      />
    </div>
  )
}