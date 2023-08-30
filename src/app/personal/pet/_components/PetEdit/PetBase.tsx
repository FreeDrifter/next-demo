'use client'
import { ChipTypeOptions, PetInfo, PetSexOptions, getAllPetColorList, getAllPetKindList } from '@/shared/apis/pet'
import { getLengthValidator } from '@/shared/utils/validator'
import { ProFormDatePicker, ProFormDependency, ProFormDigit, ProFormSelect, ProFormText, StepsForm } from '@ant-design/pro-components'
import { Button, ColProps, Form, Input, Select, Space } from 'antd'
import styles from './index.module.scss'
import { FormColProps } from '@/shared/helper/styleConfig'
import { transAntOptionAPI } from '@/shared/utils/transform'

const colProps: ColProps = FormColProps

export default function PetBaseInfo() {
  const isAuthed = false

  return (
    <StepsForm.StepForm<PetInfo>
      title='基本信息'
      grid rowProps={{ gutter: [16, 0] }}
      className={`px-5 ${styles.petForm}`}
    >
      {
        !isAuthed && <Form.Item label="犬舍" className='w-full'>
          <Button type="primary">认证犬舍</Button>
        </Form.Item>
      }

      <div className='w-full'>
        <ProFormSelect
          label="芯片类型" name="chipType" placeholder={'请选择芯片类型'} colProps={colProps}
          options={ChipTypeOptions} rules={[{ required: true }]}
        />

        <ProFormDependency name={['chipType']}>
          {({}) => {
            return (
              <ProFormText
                label="芯片编号" name="chipNo" placeholder={'请输入芯片编号'} colProps={colProps}
                rules={[{ required: true }]}
              />
            )
          }}
        </ProFormDependency>
      </div>

      {/* <Form.Item label="芯片编号" className='w-full pl-2'>
        <Form.Item
          name="chipNo" className='inline-block w-1/4 mb-0 mr-1'
        >
          <Input placeholder={'请输入芯片编号'} />
        </Form.Item>
        <Space className="inline-block w-36">
          <Select placeholder="芯片类型" />
        </Space>
        <Button type="primary" className="ml-1">校验芯片</Button>
        <Button type="primary" className="ml-1">使用宠咪芯片</Button>
      </Form.Item> */}
      <ProFormText
        label="犬只名称" name="name" placeholder={'请输入犬只名称'} colProps={colProps}
        rules={[
          { required: true },
          { validator: getLengthValidator({ min: 3, max: 10 }) }
        ]}
      />
      <ProFormText
        label="犬只小名" name="petName" placeholder={'请输入犬只小名'} colProps={colProps}
        rules={[
          { validator: getLengthValidator({ min: 1, max: 5 }) }
        ]}
      />
      <ProFormSelect
        label="犬只种类" name="kindId" placeholder={'请选择犬只种类'} colProps={colProps}
        request={transAntOptionAPI(getAllPetKindList, { label: 'kindName', value: 'id' })}
        rules={[{ required: true }]}
      />
      <ProFormSelect
        label="犬只颜色" name="petColourId" placeholder={'请选择犬只颜色'} colProps={colProps}
        request={transAntOptionAPI(getAllPetColorList, { label: 'colorName', value: 'id' })}
        rules={[{ required: true }]}
      />
      <ProFormSelect
        label="犬只性别" name="sex" placeholder={'请选择犬只性别'} colProps={colProps}
        options={PetSexOptions}
        rules={[{ required: true }]}
      />
      <ProFormDigit
        label="犬只月龄" name="monthAge" placeholder={'请输入犬只月龄'} colProps={colProps}
        min={0} max={500} fieldProps={{ precision: 0 }}
        rules={[{ required: true }]}
      />
      <ProFormDigit
        label="犬只高度" name="height" placeholder={'请输入犬只高度'} colProps={colProps}
        min={0} max={500} fieldProps={{ precision: 0 }}
        rules={[{ required: true }]}
      />
      <ProFormDigit
        label="犬只宽度" name="width" placeholder={'请输入犬只宽度'} colProps={colProps}
        min={0} max={500} fieldProps={{ precision: 0 }}
        rules={[{ required: true }]}
      />
      <ProFormDatePicker
        label="出生日期" name="birthData" placeholder={'请选择出生日期'} colProps={colProps}
        dataFormat='YYYY-MM-DD' className='w-full'
      />
      <ProFormText
        label="DNA编号" name="dnaNo" placeholder={'请输入DNA编号'} colProps={colProps}
        rules={[
          { validator: getLengthValidator({ min: 1, max: 50 }) },
        ]}
      />
      <ProFormText
        label="血统编号" name="lineageNo" placeholder={'请输入血统编号'} colProps={colProps}
        rules={[
          { validator: getLengthValidator({ min: 1, max: 50 }) },
        ]}
      />
      <ProFormText
        label="登记卡编号" name="registerCardNo" placeholder={'请输入登记卡编号'} colProps={colProps}
        rules={[
          { validator: getLengthValidator({ min: 1, max: 50 }) },
        ]}
      />
      
    </StepsForm.StepForm>
  )
}
