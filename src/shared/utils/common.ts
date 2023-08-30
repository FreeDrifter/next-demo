'use client'
import { useState } from 'react'

export function wait(time = 300) {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

// 只用来做函数返回值类型推断
type Reverse<T> = (arg: any) => T
export function returnResultType<T>(arg: Reverse<T>): T {
    return {} as T
}

export function noop() {
  // do nothing
}

export function useObjState<T extends Record<string, unknown>>(v: T): [T, <K extends keyof T>(k: K, v: T[K] | null) => void] {
  const [val, setVal] = useState(v)

  function setValByKey<K extends keyof T>(key: K, newVal: T[K] | null) {
    setVal({ ...val, [key]: newVal })
  }

  return [val, setValByKey]
}

