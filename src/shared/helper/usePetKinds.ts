'use client'
/* 犬只种类 */

import { useEffect, useState } from 'react'
import { PetKindInfo, getAllPetKindList } from '../apis/pet'
import { to } from '@/shared/utils/to'

export function usePetKinds() {
  const [petKindList, setPetKindList] = useState<PetKindInfo[]>([])

  useEffect(() => {
    loadPetKindList()
  }, [])

  async function loadPetKindList() {
    const [err, list] = await to(getAllPetKindList())
    if (!err) {
      setPetKindList(list)
    }
  }

  return {
    petKindList
  }
}