import { ProFormCheckbox, ProFormDependency, ProFormMoney, StepsForm } from '@ant-design/pro-components'
import styles from './index.module.scss'
import { PetInfo, PetShowEnvOptions, PopularizeType, PopularizeTypeOptions } from '@/shared/apis/pet'
import { Divider } from 'antd'

export default function PetRelationInfo() {
  return (
    <StepsForm.StepForm<PetInfo>
      title="关联信息" grid
      className={`px-5 ${styles.petForm}`}
    >
      <ProFormCheckbox.Group
        label="展示环境" name={'showEvn'}
        options={PetShowEnvOptions}
        rules={[{ required: true }]}
      />

      <Divider className='mt-0 mb-5' />

      <ProFormCheckbox.Group
        label="发布类型" name={'popularizeType'}
        options={PopularizeTypeOptions}
        rules={[{ required: true }]}
      />

      <Divider className='mt-0 mb-5' />
      
      <ProFormDependency name={['popularizeType']}>
        {(petInfo: PetInfo) => {
          return (
            petInfo.popularizeType?.map((type) => {
              const priceItem = getPriceTypeOptions(type)
              return (
                <ProFormMoney
                  label={priceItem.label} name={priceItem.key} key={type}
                  min={0} max={1000000} fieldProps={{ precision: 0 }}
                  colProps={{ xxl: 6, xl: 6, md: 8 }} wrapperCol={{ span: 22 }}
                  placeholder={`请输入${priceItem.label}(人民币)`}
                  rules={[{ required: true }]}
                />
              )
            })
          )
        }}
      </ProFormDependency>
    </StepsForm.StepForm>
  )
}

function getPriceTypeOptions(popularizeType: PopularizeType) {
  return ({
    [PopularizeType.SALE]: { label: '销售金额', key: 'salePrice' },
    [PopularizeType.BREED]: { label: '借配金额', key: 'breedPrice' },
    [PopularizeType.ADOPTION]: { label: '领养金额', key: 'salePrice' },
  })[popularizeType] as { label: string, key: 'salePrice' | 'breedPrice' }
}