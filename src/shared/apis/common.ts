/* 公共方法 */

import { apiFetch } from '@/shared/utils/request'

/* 获取上传 token */
export function getUploadToken(): Promise<string> {
  return apiFetch('/web/img/getQiniuyunToken')
}

/* 获取省/市/区 */
export function getAreaList(parentId?: string): Promise<AreaInfo[]> {
  if (!parentId) {
    return apiFetch('/web/common/getLeve0')
  }
  return apiFetch('/web/common/getchild', {
    data: { parentId }
  })
}

export type ImageInfo = {
  isCover?: boolean // 是否封面
  high?: string // 图片高度
  size?: string // 图片大小
  url: string // 头像地址
  width?: string // 图片宽度
  height?: string // 图片高度
}

// 操作类型
export enum OperateType {
  ADD, // 新增
  MODIFY, // 修改
  DETAIL, // 查看详情
}

export function getOperateTitle(type: OperateType) {
  switch (type) {
    case OperateType.ADD:
      return '新增'
    case OperateType.MODIFY:
      return '修改'
    case OperateType.DETAIL:
    default:
      return '详情'
  }
}

export type AreaInfo = {
  id: string
  lat: string
  level: string
  name: string
  parentId: string
  pinyin: string
  zipCode: string
  simpleName: string
}