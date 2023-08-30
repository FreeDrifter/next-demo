import { ListParamsOptional, ListResult } from '@/shared/helper/useQueryList';
import dayjs from 'dayjs'

/**
 * 将服务分页获取 api, 转化为 Ant ProTable 所需 request 形式
 */
type QueryAPI<K, R> = (p: K & ListParamsOptional) => Promise<ListResult<R>>
type AntQueryAPI<K, R> = (p: K & { current?: number; pageSize?: number }) => Promise<{
  data: R[]
  success: boolean
  total: number
}>
export function transAntQueryAPI<K, R>(api: QueryAPI<K, R>): AntQueryAPI<K, R> {
  return (params) => {
    return api({
      ...params,
      page: params.current,
    }).then(res => {
      return {
        data: res.records as R[],
        success: true,
        total: res.total
      }
    }).catch(err => {
      return {
        data: [],
        total: 0,
        success: false,
      }
    })
  }
}

/**
 * 将返回数组的方法(一般为封装的接口请求), 转化为 Ant ProSelect 所需 request 方法
 * fieldNames: { label: 'name', value: 'id' }
 * fieldNames.label: 下拉框展示的文本对应字段
 * fieldNames.value: 选中值对应字段
 */
type AntOptionFn<K> = (p?: K) => Promise<{ label: string; value: string | number | boolean }[]>
export function transAntOptionAPI<K, R extends Record<string, any>>(
  api: (p?: K) => Promise<R[]>,
  fieldNames: { label: keyof R; value: keyof R }
): AntOptionFn<K> {
  return (p?: K) => {
    return api(p).then(res => {
      return res.map(info => ({
        value: info[fieldNames.value],
        label: info[fieldNames.label],
      }))
    })
  }
}

/**
 * 转换 DatePicker 值, 转化为服务所需格式
 */
export function transDate(date: string | dayjs.Dayjs): string {
  if (!date) return ''
  return dayjs(date).format('YYYY-MM-DD 00:00:00')
}

/**
 * 转换 DatePicker 值, 转化为服务所需格式
 */
export function transRangeDate(dates: string[] | dayjs.Dayjs[]) {
  if (!dates || dates.length < 2) {
    return []
  }
  return [
    transDate(dates[0]),
    transDate(dates[1]),
  ]
}

/**
 * 传入 value, 获取 option 列表中 value 所对应的 label
 */
export function transOptionLabel(value: unknown, options: { label: string; value: unknown }[]): string {
  for (let i = 0; i < options.length; i++) {
    const option = options[i]
    if (option.value === value) {
      return option.label
    }
  }
  return value ? `${value}` : ''
}

type GetPlaceholderOption = {
  disabled?: boolean // disabled 时, placeholder 为 ''
}
/**
 * placeholder 公共处理
 */
export function getPlaceholder(text: string, options?: GetPlaceholderOption) {
  const { disabled } = options || {}
  return disabled ? '' : text
}