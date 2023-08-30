import { getUploadToken } from '@/shared/apis/common'
import { noop } from 'lodash'
import { to } from './to'
import * as qiniu from 'qiniu-js'

type UploadFileParams = {
  file: File
  token?: string
  onProgress?: ({ percent }: { percent: number }) => void
  onError?: (err?: unknown) => void
  onComplete?: (url: string) => void
}

export function uploadFile(params: UploadFileParams) {
  const { file, onProgress = noop, onError = noop, onComplete = noop } = params

  return new Promise(async (resolve, reject) => {
    // token 取值
    let token = params.token
    if (!token) {
      const [err, t] = await to(getUploadToken())
      if (err) {
        onError(err)
        return reject(err)
      } else {
        token = t
      }
    }

    // 避免重名
    const filename = `${Date.now()}-${Math.floor(Math.random() * 100000)}-${file.name}`
    const observable = qiniu.upload(file, filename, token, { fname: filename })

    observable.subscribe({
      next(e) {
        onProgress({ percent: e.total.percent })
      },
      error(e) {
        onError(e)
        reject(e)
      },
      async complete() {
        // 暂写死, 应通过服务获取
        const url = `http://img.dongdongdong.xyz/${filename}`
        onComplete(url)
        resolve(url)
      }
    })
  })

}