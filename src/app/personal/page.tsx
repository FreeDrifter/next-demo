import dynamic from 'next/dynamic'
const UserAccountPage = dynamic(() => import('./account'), { ssr: false })

export default function UserHomePage() {
  return (
    <UserAccountPage />
  )
}