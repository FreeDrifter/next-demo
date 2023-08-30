import { apiFetch } from '@/shared/utils/request'
import { ListParams, ListResult } from '../helper/useQueryList'
import { ImageInfo } from './user'

// 种类体重类型
export enum PetHeightType {
  LARGE = 'LARGE', // 大型
  MEDIUM = 'MEDIUM', // 中型
  SMALL = 'SMALL', // 小型
}

export enum PetSex {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export const PetSexOptions = [
  { label: '公', value: PetSex.FEMALE },
  { label: '母', value: PetSex.MALE },
]

// 展示环境
export enum PetShowEnv {
  PET_HOUSE_WEB = 'PET_HOUSE_WEB', // 犬舍网站
  WORK_PET_WEB = 'WORK_PET_WEB', // 工作犬网
  PET_SUPERMARKET = 'PET_SUPERMARKET', // 宠物超市
  BREED_INTERACTIVE = 'BREED_INTERACTIVE' // 咪宠繁殖人
}

// 展示环境 可选项
export const PetShowEnvOptions = [
  { label: '犬舍网站', value: PetShowEnv.PET_HOUSE_WEB },
  { label: '工作犬网', value: PetShowEnv.WORK_PET_WEB },
  { label: '宠物超市', value: PetShowEnv.PET_SUPERMARKET },
  { label: '咪宠繁殖人', value: PetShowEnv.BREED_INTERACTIVE },
]

// 发布类型
export enum PopularizeType {
  SALE = 'SALE', //销售
  BREED = 'BREED', //借配
  ADOPTION = 'ADOPTION', //领养
}

export const PopularizeTypeOptions = [
  { label: '销售', value: PopularizeType.SALE },
  { label: '借配', value: PopularizeType.BREED },
  { label: '领养', value: PopularizeType.ADOPTION },
]

export enum PetTitleType {
  BEAUTY_TITLE = 'BEAUTY_TITLE',
  JOB_TITLE = 'JOB_TITLE',
  SPORTS_TITLE = 'SPORTS_TITLE',
}

export const PetTitleTypeOptions = [
  { label: '选美', value: PetTitleType.BEAUTY_TITLE },
  { label: '工作', value: PetTitleType.JOB_TITLE },
  { label: '运动', value: PetTitleType.SPORTS_TITLE },
]

export enum ChipType {
  CKU = 'CKU', // CKU 芯片
  MCZOO = 'MCZOO', // 咪宠芯片
}

export const ChipTypeOptions = [
  { label: 'CKU 芯片', value: ChipType.CKU },
  { label: '咪宠芯片', value: ChipType.MCZOO },
]

export type PetInfo = {
  id?: string
  birthData?: string // 宠物出生日期
  chipNo?: string // 芯片编码
  chipType?: ChipType // 芯片类型
  coverImage?: ImageInfo // 宠物封面图片
  image?: ImageInfo[] // 宠物图片
  height?: number | null // 宠物高度
  width?: number | null // 宠物宽度
  heightType?: PetHeightType // 宠物体重类型
  kindId?: number // 宠物种类 id
  kindName?: string // 宠物种类名称
  // memberId:
  monthAge?: number | null // 宠物月龄
  name?: string // 宠物大名
  petColourId?: number // 宠物毛色 id
  petColourName?: string // 宠物毛色名称
  sex?: PetSex // 宠物性别
  breedId?: string // 繁殖窝 id
  breedNo?: string // 配种编号
  dnaNo?: string // DNA 编码
  lineageNo?: string // 血统编号
  petHouseId?: string // 犬舍 id
  petName?: string // 宠物小名
  petTitleType?: string // 头衔类型
  popularizeType?: PopularizeType[] // 推广方式/发布类型
  registerCardNo?: string // 登记卡编号
  salePrice?: number // 销售价格
  breedPrice?: number // 配种价格
  showEvn?: PetShowEnv[] // 展示环境
  mczooPetBloodlineRequestVo?: {
    // 
  },
  mczooPetHonerDetailRequestVos?: HonerDetail[] // 犬只荣誉
}

export type HonerDetail = {
  /**
     * 赛事详细地址
     */
  address?: string;
  /**
   * 区
   */
  area?: string;
  /**
   * 区Id
   */
  areaId: number;
  /**
   * 获奖证书
   */
  awardImg?: ImageInfo[];
  /**
   * 获奖信息
   */
  awardInformation: AwardInformation[];
  /**
   * 市
   */
  city?: string;
  /**
   * 市Id
   */
  cityId: number;
  /**
   * 国家
   */
  country?: string;
  /**
   * 国家Id
   */
  countryId: number;
  /**
   * 创建人
   */
  createBy?: string;
  /**
   * 比赛图片
   */
  matchImg?: ImageInfo[];
  /**
   * 比赛名称
   */
  matchName: string;
  /**
   * 比赛主办方
   */
  matchSponsor: string;
  /**
   * 比赛时间
   */
  matchTime: Date;
  /**
   * 犬只Id
   */
  petId?: number;
  /**
   * 头衔类型：BEAUTY_TITLE-选美头衔 BEAUTY_TITLE-工作头衔 SPORTS_TITLE-运动头衔
   */
  petTitleType: PetTitleType;
  /**
   * 省
   */
  province: string;
  /**
   * 省Id
   */
  provinceId: number;
}

export interface AwardInformation {
  /**
   * 比赛项目
   */
  competitionEvent?: string;
  /**
   * 获得荣誉
   */
  honor?: string;
  /**
   * 比赛一级分类
   */
  levelOneCategory?: string;
  /**
   * 比赛二级分类
   */
  levelTwoCategory?: string;
  /**
   * 比赛得分
   */
  score?: string;
  /**
   * 获得头衔
   */
  title?: string;
}

export function getEmptyPetInfo(): PetInfo {
  return {}
}

export type PetKindInfo = {
  animalType: 'DOG' | 'CAT'
  codeId: string // 种类代码
  createBy: string // 创建人
  createTime: string // 创建时间
  ename: string // 种类英文名称
  flag: string // 英文标识
  id: number
  isHot: string // YES是 NO否,可用值:NO,YES
  kindGroup: string // 种类分组
  kindHeightType: string // 种类体重类型：LARGE大型 MEDIUM中型 SMALL小型,可用值:LARGE,MEDIUM,SMALL
  kindName: string // 种类名称
  kindType: string // 种类类型：FCI_KIND-FCI正式品种 FCI_NATION_KIND-FCI国家级认可品种,可用值:FCI_KIND,FCI_NATION_KIND
  updateBy: string // 修改人
  updateTime: string
}

/* 获取犬只种类列表 */
export function getPetKindList(params: ListParams): Promise<ListResult<PetKindInfo>> {
  return apiFetch('/web/pet/base/index/pageQueryIndexAll', { data: params, method: 'POST' })
}

/* 获取所有犬只种类列表 */
export function getAllPetKindList() {
  return getPetKindList({ page: 0, pageSize: 10000 }).then(res => res.records)
}

type PetColorInfo = {
  animalType: 'CAT' | 'DOG',
  codeId: string
  colorName: string
  ename: string
  id: string
}

export function getAllPetColorList(): Promise<PetColorInfo[]> {
  return apiFetch('/web/common/queryAllPetColor')
}