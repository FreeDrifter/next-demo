import Link from 'next/link'
import styles from './index.module.scss'

export default function ProductNav() {
  return (
    <div className={styles.navRoot}>
      <Link href="" className={styles.navLink}>首页</Link>
      <Link href="" className={styles.navLink}>选狗</Link>
      <Link href="" className={styles.navLink}>优犬之家</Link>
      <Link href="" className={styles.navLink}>专业赛事</Link>
      <Link href="" className={styles.navLink}>课程训练</Link>
      <Link href="" className={styles.navLink}>咨询</Link>
    </div>
  )
}