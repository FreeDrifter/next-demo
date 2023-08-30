import { getToken, removeToken } from '@/shared/helper/token'
import { MiChongServerAPI, isMocking } from '@/configs/apis'
import { Modal } from 'antd'

export type FetchCallOption = {
  errorAlert?: boolean // 失败后自动弹框
  headers?: Record<string, string>
}

type FetchOption = RequestInit & {
  data?: any
  errorAlert?: boolean // 失败后自动弹框
  method?: 'POST' | 'GET' | 'PATCH' | 'PUT' | 'DELETE'
} & FetchCallOption

enum ServerCode {
  TOKEN_EXPIRED = -4,
  TOKEN_ERROR = -2,
  SUCCESS = 0,
}

const TokenExpiredCodes = [ServerCode.TOKEN_EXPIRED, ServerCode.TOKEN_ERROR]

type ServerRes = {
  code: string | number
  data: any
  message: string
  responseTime: string
}

export function apiFetch(url: string, options?: FetchOption) {
  try {
    ;({ url, options } = onBeforeReq(url, options))
    ;({ url, options } = formatReqHeaders(url, options))
    ;({ url, options } = formatReqData(url, options))
  } catch(e) {
    console.error('error', e)
  }

  return fetch(url, options).then(res => {
    return onAfterRes(res, url, options)
  })
}

function onBeforeReq(url: string, options?: FetchOption) {
  const newOptions = { ...options }
  let basePath = MiChongServerAPI
  
  if (basePath[basePath.length - 1] === '/') {
    basePath = basePath.substring(0, basePath.length - 1)
  }
  if (url[0] === '/') {
    url = url.substring(1, url.length)
  }

  url = `${basePath || location.origin}/${url}`

  return {
    url,
    options: newOptions
  }
}

async function onAfterRes(res: Response, url: string, options?: FetchOption) {
  const { errorAlert = true } = options || {}
  const headers: Record<string, string> = options?.headers || {}
  const isJSON = headers['content-type'] === 'application/json'
  const responseTime = new Date().toString()

  // 服务错误
  if (res.status !== 200) {
    return Promise.reject({
      code: `${res.status}`,
      message: 'server error',
      responseTime,
      data: res
    } as ServerRes)
  }

  if (!isJSON) {
    // do
  }

  const result = await res.json() as ServerRes
  Object.assign(result, {
    message: (result as any).msg,
  })

  // 错误处理
  if (result.code != ServerCode.SUCCESS && !isMocking) {
    
    const isTokenExpired = TokenExpiredCodes.includes(Number(result.code))

    if (errorAlert) {
      // 自动弹框报错
      Modal.error({
        title: result.message,
        okText: '确定',
        onOk: () => {
          if (isTokenExpired) {
            // 过期, 删除 token, 重启
            removeToken()
            window.location.reload()
          }
        }
      })
    }

    return Promise.reject(result)
  }

  // 正确值返回
  return result.data
}

function formatReqHeaders(url: string, options: FetchOption) {
  const headers = options.headers || {}
  const token = getToken()

  // 默认 content-type
  if (!headers['content-type']) {
    headers['content-type'] = 'application/json'
  }

  if (token) {
    headers['Authorization'] = token
  }

  options.headers = headers
  return { url, options }
}

function formatReqData(url: string, options: FetchOption) {
  options.data = options.data || {}

  const { method, data } = options
  const isGet = !method || method.toLowerCase() === 'get'
  
  if (isGet) {
    const urlCtx = new URL(url)
    for (const key in data) {
      urlCtx.searchParams.set(key, data[key])
    }
    url = urlCtx.href
  } else {
    options.body = JSON.stringify(data)
  }

  return { url, options }
}