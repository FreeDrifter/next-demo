import Image from 'next/image'
import ProductNav from './_components/ProductNav'
import KejiImage from '@/imgs/global/keji.png'
import { Button, Select } from 'antd'
import PetSelect from './___test/PetSelect'

export default function HomePage() {
  return (
    <main style={{ background: '#f7f8fc', paddingTop: '20px' }}>
      <ProductNav />
      <div style={{ paddingLeft: 'calc(80px + 5%)', paddingRight: '5%', paddingTop: '4px' }}>
        <div style={{ backgroundColor: 'white' }}>
          <div className="home-hot-pets-box">
            <a className="home-hot-pet">
              <Image width={0} height={0} src={KejiImage.src} alt="" />
              <span>柯基</span>
            </a>
            <a className="home-hot-pet">
              <Image width={0} height={0} src={KejiImage.src} alt="" />
              <span>柯基</span>
            </a>
            <a className="home-hot-pet">
              <Image width={0} height={0} src={KejiImage.src} alt="" />
              <span>柯基</span>
            </a>
            <a className="home-hot-pet">
              <Image width={0} height={0} src={KejiImage.src} alt="" />
              <span>柯基</span>
            </a>
            <a className="home-hot-pet">
              <Image width={0} height={0} src={KejiImage.src} alt="" />
              <span>柯基</span>
            </a>
            <a className="home-hot-pet">
              <Image width={0} height={0} src={KejiImage.src} alt="" />
              <span>柯基</span>
            </a>
            <a className="home-hot-pet">
              <Image width={0} height={0} src={KejiImage.src} alt="" />
              <span>柯基</span>
            </a>
            <a className="home-hot-pet">
              <Image width={0} height={0} src={KejiImage.src} alt="" />
              <span>柯基</span>
            </a>
            <a className="home-hot-pet">
              <Image width={0} height={0} src={KejiImage.src} alt="" />
              <span>柯基</span>
            </a>
          </div>

          <div className="home-pet-search-box">
            <Select className="home-pet-sel" placeholder="犬只种类" />

            <Select className="home-pet-sel" placeholder="犬只性别" />

            <Button type="primary">
              选狗
            </Button>
          </div>

          <div className="pet-choose-divider" />

          <PetSelect />
        </div>
      </div>
    </main>
  )
}
