'use client'
import { Empty, EmptyProps } from 'antd'
import TipDogImage from '@/imgs/status/tip-dog.png'

type MCEmptyProps = {
  className?: string
  descriptionList?: React.ReactNode[]
} & EmptyProps

export default function MCEmpty(props: MCEmptyProps) {
  const { descriptionList = ['暂无数据'], ...antEmptyProps } = props
  return (
    <Empty
      className={`${props.className} p-8`}
      image={TipDogImage.src}
      description={(
        <div>
          {
            descriptionList.map((node, index) => (
              <p key={index} className={`m-0 mt-1 ${index === 0 && 'mt-3'}`}>
                {node}
              </p>
            ))
          }     
        </div>
      )}
      {...antEmptyProps}
    >
      {props.children}
    </Empty>
  )
}