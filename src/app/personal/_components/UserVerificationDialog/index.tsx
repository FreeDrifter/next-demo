'use client'
import { CertificateTypeOptions, VerificationParams, verificationIdentity } from '@/shared/apis/user'
import UploadImage from '@/shared/components/UploadImage'
import { transRangeDate } from '@/shared/utils/transform'
import { DialogProps, DialogWrap } from '@/shared/utils/dialog'
import { ProForm, ProFormDateRangePicker, ProFormSelect, ProFormText } from '@ant-design/pro-components'
import { Form, message } from 'antd'

type UserVerificationDialogProps = {
  onSuccess?: () => void
} & DialogProps

const Layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
}

/**
 * 实名认证弹框
 */
export default function UserVerificationDialog(props: UserVerificationDialogProps) {
  async function onSubmit(params: VerificationParams) {
    await verificationIdentity(params)
    message.success('实名认证成功')
    props.onSuccess?.()
    props.onClose?.()
  }

  return (
    <DialogWrap title="实名认证" width={'550px'} footer={null}>
      <ProForm<VerificationParams>
        rootClassName="mt-4"
        {...Layout}
        layout={'horizontal'}
        dateFormatter={'string'}
        onFinish={onSubmit}
        submitter={{
          searchConfig: { resetText: '关闭' },
          render: (props, doms) => <div className="flex items-center justify-end gap-2">{doms}</div>, // 居右显示
          onReset: props.onClose
        }}
      >
        <ProFormSelect
          label="证件类型" name="certificateType"
          options={CertificateTypeOptions}
          rules={[{ required: true }]}
        />
        <ProFormText
          label="证件号" name="certificateNo"
          rules={[{ required: true }]}
        />
        <ProFormText
          label="真实姓名" name="trueName"
          rules={[{ required: true }]}
        />
        <ProFormDateRangePicker
          label="证件有效期" name="certificateTime"
          transform={(dates) => ({ certificateTime: transRangeDate(dates) })}
        />
        <Form.Item
          label="身份证国徽面" name="frontImg" {...Layout}
          
        >
          <UploadImage.Single width={200} height={120} />
        </Form.Item>
        <Form.Item
          label="身份证人像面" name="backImg" {...Layout}
          
        >
          <UploadImage.Single width={200} height={120} />
        </Form.Item>
      </ProForm>
    </DialogWrap>
  )
}