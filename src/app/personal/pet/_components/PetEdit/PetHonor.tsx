import { ProCard, ProFormDatePicker, ProFormSelect, ProFormText, StepsForm } from '@ant-design/pro-components'
import styles from './index.module.scss'
import { PetInfo, PetTitleTypeOptions } from '@/shared/apis/pet'
import { useState } from 'react'
import { times } from 'lodash'
import { Button, ColProps, Form } from 'antd'
import UploadImage from '@/shared/components/UploadImage'

const colProps = { xxl: 4, xl: 6, md: 8, sm: 12, xs: 24 }

const MinCount = 1

const ChildCardBodyStyle = {
  paddingTop: 0,
  paddingBottom: 0
}

export default function PetHonorInfo() {
  const [honorCount, setHonorCount] = useState(MinCount)

  function addHonner() {
    setHonorCount(honorCount + 1)
  }

  function removeHonner() {
    setHonorCount(honorCount - 1)
  }

  return (
    <StepsForm.StepForm<PetInfo>
      title="犬只荣誉"
      className={`${styles.petForm}`}
    >
      {
        times(honorCount, (index) => (
          <ProCard
            title="犬只荣誉" bordered collapsible key={index}
            className='mb-4'
            bodyStyle={{ flexWrap: 'wrap', paddingTop: '30px' }}
            extra={index === honorCount - 1 && <div>
              { honorCount !== MinCount && <Button size="small" onClick={removeHonner}>删除荣誉</Button> }
              <Button size='small' className='ml-2' onClick={addHonner}>添加荣誉</Button>
            </div>}
          >
            <ProCard colSpan={colProps} bodyStyle={ChildCardBodyStyle}>
              <ProFormText
                label="赛事名称"
                name={['mczooPetHonerDetailRequestVos', index, 'matchName']}
              />
            </ProCard>
            <ProCard colSpan={colProps} bodyStyle={ChildCardBodyStyle}>
              <ProFormText
                label="赛事主办方"
                name={['mczooPetHonerDetailRequestVos', index, 'matchSponsor']}
              />
            </ProCard>
            <ProCard colSpan={colProps} bodyStyle={ChildCardBodyStyle}>
              <ProFormDatePicker
                label="活动时间"
                name={['mczooPetHonerDetailRequestVos', index, 'matchTime']}
              />
            </ProCard>
            <ProCard colSpan={colProps} bodyStyle={ChildCardBodyStyle}>
              <ProFormSelect
                label="获得头衔"
                name={['mczooPetHonerDetailRequestVos', index, 'petTitleType']}
                options={PetTitleTypeOptions}
              />
            </ProCard>
            <ProCard bodyStyle={ChildCardBodyStyle}>
              <Form.Item
                label="荣誉证书" name={['mczooPetHonerDetailRequestVos', index, 'awardImg']}
              >
                <UploadImage.Mult />
              </Form.Item>
            </ProCard>
            <ProCard bodyStyle={ChildCardBodyStyle}>
              <Form.Item label="比赛图片" name={['mczooPetHonerDetailRequestVos', index, 'matchImg']}>
                <UploadImage.Mult />
              </Form.Item>
            </ProCard>
          </ProCard>
        ))
      }
    </StepsForm.StepForm>
  )
}