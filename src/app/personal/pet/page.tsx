'use client'

import dynamic from 'next/dynamic'

const PetList = dynamic(() => import('./_components/PetList'), { ssr: false })

export default function UserPetPage() {
  return (
    <PetList />
  )
}
