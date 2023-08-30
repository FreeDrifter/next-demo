import { UserInfo, UserSexOptions, modifyUserInfo } from '@/shared/apis/user'
import FormAreaSelect from '@/shared/components/FormAreaSelect'
import UploadImage from '@/shared/components/UploadImage'
import { DialogProps, DialogWrap } from '@/shared/utils/dialog'
import { transDate } from '@/shared/utils/transform'
import { getEmailValidator, englishNickNameValidator, getArrayEmptyValidator, nickNameValidator } from '@/shared/utils/validator'
import { ProForm, ProFormDatePicker, ProFormSelect, ProFormText } from '@ant-design/pro-components'
import { Form } from 'antd'

type UserEditProps = {
  userInfo: UserInfo
  onSuccess?: (user: UserInfo) => void
} & DialogProps

const Layout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } }

export default function UserEditDialog(props: UserEditProps) {

  async function onSave(values: UserInfo) {
    await modifyUserInfo(values)
    const userInfo = { ...props.userInfo, ...values }
    props.onSuccess && props.onSuccess(userInfo)
    props.onClose && props.onClose()
  }

  return (
    <DialogWrap title="修改基本信息" width={'600px'} footer={null}>
      <ProForm<UserInfo>
        {...Layout}
        rootClassName='mt-4'
        initialValues={{ ...props.userInfo }}
        layout={'horizontal'}
        dateFormatter={'string'}
        onFinish={onSave}
        submitter={{
          searchConfig: { resetText: '关闭', submitText: '保存' },
          render: (props, doms) => <div className="flex items-center justify-end gap-2">{doms}</div>, // 居右显示
          onReset: props.onClose
        }}
      >
        <ProFormText
          label="用户昵称" name={'name'} placeholder="请输入用户昵称"
          rules={[{ validator: nickNameValidator }]} required
        />
        <ProFormText
          label="英文昵称" name={'ename'} placeholder="请输入英文昵称"
          rules={[{ validator: englishNickNameValidator }]} required
        />
        <ProFormDatePicker
          label="生日" name={'birthData'}
          dataFormat={'YYYY-MM-DD'}
          transform={(date) => transDate(date)}
          rules={[{ required: true, message: '请选择生日' }]}
        />
        <ProFormSelect
          label="性别" name={'sex'} placeholder={'请选择性别'}
          options={UserSexOptions}
          rules={[{ required: true, message: '请选择性别' }]}
        />
        <Form.Item
          label="头像" name={'avatar'} required
          {...Layout}
          rules={[{ validator: getArrayEmptyValidator({ msg: '请上传头像' }) }]}
        >
          <UploadImage.Single objectFit={'cover'} />
        </Form.Item>
        <ProFormText
          label="邮箱" name={'email'} placeholder="请输入邮箱" required
          rules={[{ validator: getEmailValidator() }]}
        />
        <ProFormText label="网站地址" name={'websiteAddress'} placeholder="请输入网站地址" />
        <FormAreaSelect label="所在地区" />
        <ProFormText label="详细地址" name={'address'} placeholder="请输入详细地址" />
        <ProFormText label="个性签名" name={'memberSignature'} placeholder="请输入个性签名" />

        <Form.Item
          label="会员封面" name={'coverImage'}
          {...Layout}
        >
          <UploadImage.Single objectFit={'cover'} />
        </Form.Item>

      </ProForm>
    </DialogWrap>
  )
}
