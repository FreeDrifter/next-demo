import { Button } from 'antd'
import styles from './index.module.scss'

export default function Search() {
  return (
    <div className={styles.search}>

      <input className={styles.searchInput} type="text" />
      <Button className={styles.searchBtn} type="primary">
        搜索
      </Button>
      
    </div>
  )
}