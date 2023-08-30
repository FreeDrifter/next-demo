'use client'

import React from 'react'
import { StyleProvider, createCache, extractStyle, legacyLogicalPropertiesTransformer } from '@ant-design/cssinjs'
import { useServerInsertedHTML } from 'next/navigation'
import { isNodeEnv } from '@/shared/utils/env'

const globalCache = createCache()

/**
 * 样式兼容
 * https://ant.design/docs/react/use-with-next-cn#%E4%BD%BF%E7%94%A8-nextjs-%E7%9A%84-app-router
 * https://ant.design/docs/react/compatible-style-cn
 * px2remTransformer(rem 适配)
 */
const StyledComponentsRegistry = ({ children }: { children: React.ReactNode }) => {
  const cache = isNodeEnv() ? createCache() : globalCache

  useServerInsertedHTML(() => (
    <style id="antd" dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} />
  ));
  
  return (
    <StyleProvider
      cache={cache}
      hashPriority='high'
      transformers={[legacyLogicalPropertiesTransformer]}
    >
      {children}
    </StyleProvider>
  )
}

export default StyledComponentsRegistry