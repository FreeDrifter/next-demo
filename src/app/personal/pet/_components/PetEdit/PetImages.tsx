import { StepsForm } from '@ant-design/pro-components'
import styles from './index.module.scss'
import { PetInfo } from '@/shared/apis/pet'
import { Form } from 'antd'
import UploadImage from '@/shared/components/UploadImage'

export default function PetImagesInfo() {
  return (
    <StepsForm.StepForm<PetInfo>
      title="相册管理"
      className={`px-5 ${styles.petForm}`}
    >
      <Form.Item
        label="上传犬只照片" name={'image'}
        rules={[{ required: true }]}
      >
        <UploadImage.Mult max={5} />
      </Form.Item>

      <Form.Item
        label="上传犬只封面图" name={'coverImage'}
        rules={[{ required: true }]}
      >
        <UploadImage.Single />
      </Form.Item>
    </StepsForm.StepForm>
  )
}