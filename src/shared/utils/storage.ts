import { isNodeEnv } from './env'

export enum StoreType {
  LOCAL,
  SESSION,
}

type StorageData = {
  type: string,
  data: unknown
}

/* 内存缓存 */
export const CacheStore = (function () {
  let caches: Record<string, unknown> = {}

  function set(key: string, val: unknown) {
    caches[key] = val
  }

  function get(key: string) {
    return caches[key]
  }

  function remove(key: string) {
    delete caches[key]
  }

  function clear() {
    caches = {}
  }

  return {
    set,
    get,
    remove,
    clear,
  }
})()

class Store {
  private keyNS = 'mc-'
  
  private storage: Storage
  
  constructor(type = StoreType.LOCAL) {
    this.storage = type === StoreType.LOCAL ? localStorage : sessionStorage
  }

  private getStoreKey(key: string) {
    return `${this.keyNS}${key}`
  }

  get(key: string) {
    const storeKey = this.getStoreKey(key)
    try {
      const jsonVal = this.storage.getItem(storeKey) as string
      const val = JSON.parse(jsonVal) as StorageData
      return val.data
    } catch(e) {
      return null
    }
  }

  set(key: string, val: unknown) {
    const storeKey = this.getStoreKey(key)
    try {
      this.storage.setItem(storeKey, JSON.stringify({
        data: val,
        type: typeof val
      }))
    } catch(e) {
      console.error('local set error', e)
    }
  }

  remove(key: string) {
    const storeKey = this.getStoreKey(key)
    return this.storage.removeItem(storeKey)
  }

  clear() {
    for (const key in this.storage) {
      if (key.indexOf(this.keyNS) === 0) {
        this.storage.removeItem(key)
      }
    }
  }
}

/* localStorage */
export const LocalStore = (function () {
  if (isNodeEnv()) return CacheStore

  return new Store(StoreType.LOCAL)
})()

/* sessionStorage */
export const SessionStore = (function () {
  if (isNodeEnv()) return CacheStore

  return new Store(StoreType.SESSION)
})()