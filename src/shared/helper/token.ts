import Cookies from 'js-cookie'
import { isBrowserEnv, isNodeEnv } from '@/shared/utils/env'

const CookieConfig: Cookies.CookieAttributes = {
  domain: getDomain(),
  expires: 1, // 过期 1 天
}

const TokenStoreKey = 'mc-token'

export function setToken(val: string) {
  if (isBrowserEnv()) {
    Cookies.set(TokenStoreKey, val, CookieConfig)
  }
}

export function getToken() {
  if (isBrowserEnv()) {
    return Cookies.get(TokenStoreKey)
  }
  return ''
}

export function hasToken() {
  return !!getToken()
}

export function removeToken() {
  if (isBrowserEnv()) {
    return Cookies.remove(TokenStoreKey)
  }
}

function getDomain(level = 2) {
  if (isNodeEnv()) {
    return ''
  }
  const list = document.domain.split('.')
  if (list.length <= level) {
    return list.join('.')
  }
  return list.slice(list.length - level).join('.')
}
