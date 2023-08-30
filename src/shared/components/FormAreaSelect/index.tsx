import { getAreaList } from '@/shared/apis/common'
import { to } from '@/shared/utils/to'
import { ProFormCascader } from '@ant-design/pro-components'
import { useEffect, useState } from 'react'

type AreaSelectProps = React.ComponentProps<typeof ProFormCascader> & {
  names?: string[]
}

type AreaOption = {
  value?: string
  label: React.ReactNode
  children?: AreaOption[]
  isLeaf?: boolean
}

export default function FormAreaSelect(props: AreaSelectProps) {
  const [options, setOptions] = useState<AreaOption[]>([])

  useEffect(() => {
    loadAreaOptions()
  }, [])

  async function loadAreaOptions(selectedOptions: AreaOption[] = []) {
    const targetOption = selectedOptions[selectedOptions.length - 1]
    let parentId = targetOption && targetOption.value
    const [err, areaList] = await to(getAreaList(parentId))
    if (err) {
      return
    }

    const children = areaList.map(area => ({
      value: area.id,
      label: area.name,
      isLeaf: Number(area.level) >= 3,
    }))

    if (targetOption) {
      targetOption.children = children
      options && setOptions([...options])
    } else {
      setOptions([...children])
    }
  }

  // function onCascaderChanged(val: string[]) {
  //   if (val && val.length) {
  //     props.onChange && props.onChange(val[0])
  //   }
  // }

  return (
    <ProFormCascader
      name="areaItems"
      {...props}
      fieldProps={{
        options: options,
        loadData: loadAreaOptions,
      }}
      transform={(vals = []) => {
        const names = props.names || []
        return {
          [names[0] || 'provinceId']: vals[0],
          [names[1] || 'cityId']: vals[1],
          [names[2] || 'areaId']: vals[2],
        }
      }}
    />
  )
}