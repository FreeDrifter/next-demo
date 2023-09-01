// import ProductNav from './_components/ProductNav'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main style={{ background: '#f7f8fc', padding: '100px' }}>
      {/* <ProductNav /> */}
      <Link href="/personal">点击跳转到 /personal</Link>
    </main>
  )
}
