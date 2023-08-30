'use client'
import { PetInfo } from '@/shared/apis/pet'
import { StepsForm } from '@ant-design/pro-components'
import PetBaseInfo from './PetBase'
import styles from './index.module.scss'
import PetImagesInfo from './PetImages'
import PetRelationInfo from './PetRelation'
import PetHonorInfo from './PetHonor'
import PetDescentInfo from './PetDescent'
import { PetEditProps } from './_helper'
import { OperateType, getOperateTitle } from '@/shared/apis/common'
import { createPet, updatePetDetail } from '../../_apis/pet'
import { Modal } from 'antd'
import { useRouter } from 'next/navigation'

export default function PetEdit(props: PetEditProps) {
  const { operateType } = props
  const operateTitle = getOperateTitle(operateType)
  const router = useRouter()

  async function savePetInfo(petInfo: PetInfo) {
    const saveFn = operateType === OperateType.ADD ? createPet : updatePetDetail
    await saveFn(petInfo)
    Modal.confirm({
      title: `犬只${operateTitle}成功`,
      okText: '确定',
      onOk: () => {
        router.push('/personal/pet')
      }
    })
  }

  return (
    <div className={`p-4 ${styles.stepFormBox}`}>
      <StepsForm
        onFinish={savePetInfo}
        formProps={{
          validateMessages: { required: '该项为必填项' }
        }}
        submitter={{
          render: (props, dom) => <div className={styles.stepBtnBox}>{dom}</div>,
        }}
      >
        <PetBaseInfo />
        <PetImagesInfo />
        <PetRelationInfo />
        <PetHonorInfo />
        <PetDescentInfo />
      </StepsForm>
    </div>
  )
}