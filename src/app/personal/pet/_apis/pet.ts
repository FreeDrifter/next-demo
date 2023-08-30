import { PetInfo } from "@/shared/apis/pet"
import { ListResult } from "@/shared/helper/useQueryList"
import { apiFetch } from "@/shared/utils/request"

export type PetListParams = {
  name?: string // 犬名
  chipNo?: string // 芯片编码
}

/**
 * 会员获取犬只列表
 * http://www.dongdongdong.xyz/web/doc.html#/default/MP-%E7%8A%AC%E5%8F%AA%E4%BF%A1%E6%81%AF/memberPageQueryMczooPetUsingPOST
 */
export function getUserPetList(params: PetListParams): Promise<ListResult<PetInfo>> {
  return apiFetch('/web/member/pet/memberPageQueryMczooPet', {
    data: params,
    method: 'POST',
  })
}

/**
 * 添加犬只
 */
export function createPet(petInfo: PetInfo) {
  return apiFetch('/web/member/pet/addPetDetail', {
    method: 'POST',
    data: petInfo
  })
}

/**
 * 删除犬只
 */
export function deletePet(id: number) {
  return apiFetch('/web/member/pet/delPetDetailById', {
    method: 'POST',
    data: { id }
  })
}

/**
 * 获取犬只详情
 */
export function getPetDetail(id: number) {
  return apiFetch('/web/member/pet/queryPetDetailById', {
    data: { id }
  })
}

/**
 * 修改犬只信息
 */
export function updatePetDetail(petInfo: PetInfo) {
  return apiFetch('/web/member/pet/updatePetDetail', {
    method: 'POST',
    data: petInfo
  })
}