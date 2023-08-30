'use client'
import { OperateType } from '@/shared/apis/common'
import dynamic from 'next/dynamic'
const PetEdit = dynamic(() => import('../_components/PetEdit'), { ssr: false })

export default function PetAddPage() {
  return (
    <div>
      <PetEdit operateType={OperateType.ADD} />
    </div>
  )
}