import '../shared/theme/globals.scss'
import type { Metadata } from 'next'
import TopNav from './_components/TopNav'
import RootRender from '../shared/helper/RootRender'

export const metadata: Metadata = {
  title: '咪宠',
  description: '咪宠',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="zh">
      <body id="MiChongBodyRoot">
        <RootRender>
          <div className="mc-root">
            <TopNav />
              
            <div className="mc-contents">
              {children}
            </div>
          </div>
        </RootRender>
      </body>
    </html>
  )
}
