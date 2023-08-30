'use client'
import { to } from "@/shared/utils/to"
import { cloneDeep } from "lodash"
import { useRef, useState } from "react"

export type ListParams = {
  page: number
  pageSize: number
}

export type ListResult<T> = {
  records: T[]
  total: number
}

export type ListParamsOptional = {
  [K in keyof ListParams]?: ListParams[K]
}

export type SearchParams = Record<string, unknown> & ListParamsOptional

export enum LoadMode {
  PAGING = 'PAGING', // 分页获取 (每次加载数据, 都重新覆盖 list)
  APPEND = 'APPEND', // 追加获取/获取更多 (每次加载数据, 将新数据追加到旧数据之后)
}

type UseAPIOptions<R extends SearchParams> = {
  autoLoad?: boolean // 是否自动加载(调用 useAPIList 即自动调用 loadList). 默认值为 true
  loadMode?: LoadMode
  notResetKeys?: (keyof R)[] // 重置调用时, 不会被重置的搜索项 key
}

// useAPIList 所需参数
type UseAPIListParams<T, R extends SearchParams> = {
  api: (p: R) => Promise<ListResult<T>>
  searchParams?: R
} & UseAPIOptions<R>

export function useQueryList<T, R extends SearchParams>(apiParams: UseAPIListParams<T, R>) {
  const { api, autoLoad = true, loadMode = LoadMode.PAGING, notResetKeys = [] } = apiParams

  const [list, setList] = useState<T[]>([]),
    [loading, setLoading] = useState(false),
    [total, setTotal] = useState(0),
    [hasBeenLoaded, setHasBeenLoaded] = useState(false)

  const [initialSearchParams] = useState(cloneDeep(apiParams.searchParams || {})),
    [searchParams, setSearchParams] = useState<R>(cloneDeep(initialSearchParams) as R),
    [pageParams, setPageParams] = useState<ListParams>({
      page: searchParams.page || 10,
      pageSize: searchParams.pageSize || 1,
    })

  const lastLoadId = useRef(0) // 最后一次请求的 id (避免异常出现同时多次请求, 且第一次请求 比 第二次请求 返回慢的情况)

  /* ================== 执行 ↓↓↓ ================== */

  async function loadList(otherOptions?: Record<string, unknown>) {
    lastLoadId.current = lastLoadId.current + 1
    const currentLoadId = lastLoadId.current 
    
    setLoading(true)
    const [err, result] = await to(api({
      ...searchParams,
      ...formatPageParams(pageParams),
      ...otherOptions
    }))
    setLoading(false)
    setHasBeenLoaded(true)

    if (err) {
      // 项目已配置全局报错. do nothing
    } else if (lastLoadId.current !== currentLoadId) {
      // 当前请求结果不属于最新请求. do nothing
    } else {
      setNewList(result)
    }
  }

  function reloadList(otherOptions?: Record<string, unknown>) {
    const newPageParams: ListParams = {
      ...pageParams,
      page: 1,
    }
    setPageParams(newPageParams)
    setList([])
    
    return loadList({
      ...otherOptions,
      ...formatPageParams(newPageParams),
    })
  }

  function reset(options?: { load: boolean }) {
    const { load = true } = options || {}

    const notResetParams: SearchParams = {}
    for (const key in searchParams) {
      if (notResetKeys.indexOf(key) !== -1) {
          notResetParams[key] = searchParams[key]
      }
    }

    const newSearchParams = {
      ...initialSearchParams,
      ...notResetParams,
    } as R
    setSearchParams(newSearchParams)

    load && reloadList(newSearchParams)
  }

  function setNewList(listResult: ListResult<T>) {
    const resultList = formatListResult(listResult) as T[]
    const newList: T[] = []

    if (loadMode === LoadMode.APPEND) {
      newList.push(...list)
    }
    newList.push(...resultList)
    
    setList(newList)
    setTotal(formatListTotal(listResult))
  }

  function setPage(params: ListParams) {
    setPageParams({
      ...pageParams,
      ...params
    })
  }

  function setParams<K extends keyof R>(key: K, value: R[K]) {
    setSearchParams({
      ...searchParams,
      [key]: value,
    })
  }

  return {
    list, // 数据列表
    total, // 总数
    loading, // 加载中
    hasBeenLoaded, // 是否已加载
    
    pageParams, // 分页参数
    searchParams, // 搜索参数

    setPage,
    setParams,
    reset,
    loadList,
    search: reloadList,
  }
}

// 服务每个接口分页参数要求不同, 此处统一兼容传入
function formatPageParams(params: ListParams) {
  const { page, pageSize } = params
  return {
      page,
      pageSize,
  }
}

function formatListResult(listRes: any) {
  return listRes.records || listRes.rows || listRes.list || []
}

function formatListTotal(listRes: any): number {
  return listRes.total || listRes.totalCount || listRes.totalcount || 0
}