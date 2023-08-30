import Link from 'next/link'
import styles from './index.module.scss'

const IconLinkList = [
  { name: '发布爱犬', href: '/personal/pet/add', iconClass: 'icon-chongwu' }
]

export default function IconLinks() {
  return IconLinkList.map(iconLinkInfo => {
    return (
      <Link
        key={iconLinkInfo.name}
        href={iconLinkInfo.href}
        className={styles.topNavIcon}
      >
        <i className={`iconfont ${iconLinkInfo.iconClass}`} />
        <span>{ iconLinkInfo.name }</span>
      </Link>
    )
  })
}