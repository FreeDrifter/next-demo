import { OperateType } from '@/shared/apis/common'
import { PetInfo } from '@/shared/apis/pet'

export type PetEditProps = {
  operateType: OperateType
  petInfo?: PetInfo
}