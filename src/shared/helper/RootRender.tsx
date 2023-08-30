'use client'
import { ConfigProvider } from 'antd'
import StyledComponentsRegistry from './AntdRegistry'
import AntTheme from '../theme/antd'
import zhCN from 'antd/locale/zh_CN'
import { UserProvider } from './userProvider'

export default function RootRender({ children }: { children: React.ReactNode }) {
  return (
    // 全局用户信息注入
    <UserProvider>
      <StyledComponentsRegistry>
        {/* ant 全局配置 */}
        <ConfigProvider
          theme={AntTheme}
          locale={zhCN}
        >
          <div className="mc-root-content">
            {children}
          </div>
        </ConfigProvider>
      </StyledComponentsRegistry>   
    </UserProvider>
  )
}