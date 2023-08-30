'use client'
import { PetInfo, PetSexOptions, PetShowEnvOptions, getAllPetKindList } from '@/shared/apis/pet'
import { getUserPetList } from '../../_apis/pet'
import { ProColumns, ProTable } from '@ant-design/pro-components'
import { Button } from 'antd'
import Link from 'next/link'
import { transAntOptionAPI, transAntQueryAPI, transRangeDate } from '@/shared/utils/transform'
import { TableScroll } from '@/shared/helper/styleConfig'

const getPetList = transAntQueryAPI(getUserPetList)

export default function UserPetList() {
  return (
    <ProTable<PetInfo>
      className="mc-ant-pro-table-box"
      columns={getColumns()}
      request={getPetList}
      rowKey={'id'}
      scroll={TableScroll}
      toolBarRender={() => [
        <Link key="add" href="/personal/pet/add">
          <Button type="primary">新增犬只</Button>
        </Link>
      ]}
    />
  )
}

function getColumns(): ProColumns<PetInfo>[] {
  return [
    {
      title: '序号',
      dataIndex: 'id',
      search: false,
    },
    {
      title: '芯片编码',
      dataIndex: 'chipNo',
    },
    {
      title: '犬只名称',
      dataIndex: 'name',
    },
    {
      title: '犬只种类',
      dataIndex: 'kindName',
      search: false,
    },
    {
      title: '犬只种类',
      dataIndex: 'kindId',
      hideInTable: true,
      valueType: 'select',
      request: transAntOptionAPI(getAllPetKindList, { label: 'kindName', value: 'id' })
    },
    {
      title: '展示环境',
      dataIndex: 'showEvn',
      valueType: 'select',
      fieldProps: { options: PetShowEnvOptions }
    },
    {
      title: '性别',
      dataIndex: 'sex',
      valueType: 'select',
      fieldProps: { options: PetSexOptions },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInTable: true,
      valueType: 'dateRange',
      search: {
        transform: (dates) => {
          const [start, end] = transRangeDate(dates)
          return { createStartData: start, createEndData: end }
        }
      }
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      fixed: 'right',
      width: 150,
      render: (text, record, _, action) => [
        <Button type='link' key='edit'>编辑</Button>,
        <Button type='link' key='down'>下架</Button>,
        <Button type='link' key='detail'>详情</Button>,
        <Button type='link' key='remove'>删除</Button>,
      ]
    }
  ]
}