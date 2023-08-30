'use client'
import Link from 'next/link'
import styles from './index.module.scss'
import Image from 'next/image'
import LogoImg from '@/imgs/global/logo.svg'
import Search from './Search'
import IconLinks from './IconLinks'
import Profile from './Profile'

export default function TopNav() {
  return (
    <header className={styles.topNav}>
      <Link className={styles.logoBox} href="/">
        <Image src={LogoImg} alt="" priority={true} />
      </Link>

      <div className={styles.searchBox}>
        <Search />
      </div>

      <div className={styles.navTools}>
        <IconLinks />

        <Profile />
      </div>
    </header>
  )
}