'use client'

/* 管理用户信息 */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserInfo, clearCachedUserInfo, getCachedUserInfo, getUserInfo, setCahcedUserInfo } from '../apis/user';
import { hasToken, removeToken, setToken } from './token';
import { isBrowserEnv } from '@/shared/utils/env';
import { to } from '@/shared/utils/to';
import { EventEmitter } from '@/shared/utils/event';
import { returnResultType } from '@/shared/utils/common'

const useUserInfoResult = returnResultType(useUserInfo)

type UserContextProps = Partial<typeof useUserInfoResult>

const defaultContextValues: UserContextProps = {}

// 用户信息变更通知管理
const userEmitter = new EventEmitter()
enum UserEvents {
  SET_USER_INFO = 'SET_USER_INFO',
}

// 用户信息管理
const UserContext = createContext(defaultContextValues)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const userInfoContexts = useUserInfo()

  return (
    <UserContext.Provider
      value={{
        ...userInfoContexts,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  const context = useContext(UserContext as React.Context<UserContextProps>)
  
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context
}

function useUserInfo() {
  // 用户信息. 优先从缓存获取 (除 setNewUserInfo 外, 不允许任何位置再调用 setUserInfo, 应直接调用 setNewUserInfo)
  const [userInfo, setUserInfo] = useState<UserInfo>()
  // 是否加载中. 缓存中有用户信息, 则默认为 已加载完成
  const [isLoading, setLoading] = useState(!userInfo)
  // 是否已登录. 取决于是否有 userInfo 信息
  const isLoggedIn = !!userInfo

  useEffect(() => {
    if (!hasToken()) {
      // 无 token, 则还未登陆, 清空用户信息、状态, 不做任何处理
      setLoading(false)
      clearUser()
    } else {
      // 仅浏览器环境执行
      const userLoadable = isBrowserEnv()
      // 执行加载
      userLoadable && loadUserInfo()
    }
    
    // 监听 userInfo 变更 (UserProvider 可能在多个组件调用)
    userEmitter.on(UserEvents.SET_USER_INFO, setNewUserInfo)

    return () => {
      userEmitter.off(UserEvents.SET_USER_INFO, setNewUserInfo)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 加载用户信息
  async function loadUserInfo() {
    // 加载/更新服务数据
    setLoading(true)
    const cachedUserInfo = getCachedUserInfo()
    if (cachedUserInfo) {
      // 先加载缓存数据并优先展示
      setNewUserInfo(cachedUserInfo)
      setLoading(false)
      // 显示缓存数据后, 再加载并更新为远端数据
      updateRemoteUserInfo()
    } else {
      await updateRemoteUserInfo()
      setLoading(false)
    }

    // 更新为远端数据
    async function updateRemoteUserInfo() {
      const [err, info] = await to(getUserInfo())
      if (!err) {
        setUser(info)
      }
    }
  }

  function setNewUserInfo(user?: UserInfo) {
    if (user) {
      const newUserInfo = { ...userInfo, ...user }
      setUserInfo(newUserInfo)
      return newUserInfo
    } else {
      setUserInfo(undefined)
      return
    }
  }

  function setUser(user: UserInfo) {
    const newUserInfo = setNewUserInfo(user)
    setCahcedUserInfo(newUserInfo as UserInfo)
    user.token && setToken(user.token)
    userEmitter.emit(UserEvents.SET_USER_INFO, user) // 多个 React App, 通知其他使用 userContext 的位置, 将 userInfo 赋值
  }

  function clearUser() {
    setNewUserInfo(undefined)
    clearCachedUserInfo()
    removeToken()
    userEmitter.emit(UserEvents.SET_USER_INFO, undefined) // 多个 React App, 通知其他使用 userContext 的位置, 将 userInfo 赋值
  }

  return {
    userInfo,
    isLoading,
    isLoggedIn,
    setUser,
    clearUser,
  }
}