import React from 'react'
import LogoWeiXin from '@/imgs/global/logo-weixin.png'
import Image from 'next/image'

const otherWayList = [
  { name: '微信', icon: LogoWeiXin }
]

export default function OtherWays({ children }: { children: React.ReactNode }) {
  return (
    <div className='mc-login-other-way'>
      <span className="other-way-label">其他方式:</span>

      {
        otherWayList.map(otherWay => (
          <Image
            className='other-way-img'
            alt={otherWay.name} src={otherWay.icon}
            key={otherWay.name}
          />
        ))
      }

      <div className="other-way-right">
        { children }
      </div>
    </div>
  )
}