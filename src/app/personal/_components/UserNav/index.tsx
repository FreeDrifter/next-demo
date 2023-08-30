'use client'
import Link from 'next/link'
import styles from './index.module.scss'

export default function UserNav() {
  const menuList = getMenuList()

  return (
    <ul className={styles.navRoot}>
      {
        menuList.map((menu => {
          const hasChilds = menu.children && menu.children.length
          return (
            <li key={menu.name}>
              <Link className={styles.navMenuLink} href={menu.to || ''}>
                <i className={`iconfont ${menu.iconClass}`} />
                <span>{ menu.name }</span>
              </Link>
  
              {
                hasChilds && <ul className={styles.navSubMenus}>
                  {
                    menu.children.map(childMenu => (
                      <li key={childMenu.name} className={styles.navSubMenuContent}>
                        <Link className={styles.navSubMenuLink} href={childMenu.to}>
                          <span>{ childMenu.name }</span>
                        </Link>
                      </li>
                    ))
                  }
                </ul>
              }
            </li>
          )
        }))
      }
    </ul>
  )
}

function getMenuList() {
  return [
    { name: '个人信息', iconClass: 'icon-geren', to: '/personal' },
    { name: '犬只管理', iconClass: 'icon-dog', to: '/personal/pet' },
    {
      name: '犬舍管理',
      iconClass: 'icon-household_products',
      children: [
        { name: '犬舍信息', to: '/personal/pet-house' },
        { name: '窝繁殖信息', to: '/personal/pet-house/breed' },
      ]
    },
    { name: '机构管理', iconClass: 'icon-dog', to: '/personal/institution' },
    {
      name: '俱乐部管理',
      iconClass: 'icon-dog',
      children: [
        { name: '俱乐部信息', to: '/personal/club' },
        { name: '我的俱乐部', to: '/personal/club/my-clubs' },
        { name: '赛事信息', to: '/personal/club/game' },
      ]
    },
    { name: '我的报名', iconClass: 'icon-dog', to: '/personal/my-signs' },
    { name: '我的消息', iconClass: 'icon-dog', to: '/personal/my-msgs' },
  ]
}