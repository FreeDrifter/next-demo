import SingleSelect from './SingleSelect'

const PetTypes = {
  largeResponseVos: [
    { kindName: '吉娃娃' },
    { kindName: '贵宾犬' },
    { kindName: '迷你贵宾' },
    { kindName: '藏獒' },
    { kindName: '老虎' },
    { kindName: '狮子' },
    { kindName: '老鼠' },
    { kindName: '熊猫' },
    { kindName: '吉娃娃' },
    { kindName: '贵宾犬' },
    { kindName: '迷你贵宾' },
    { kindName: '藏獒' },
    { kindName: '老虎' },
    { kindName: '狮子' },
    { kindName: '老鼠' },
    { kindName: '熊猫' },
    { kindName: '吉娃娃' },
    { kindName: '贵宾犬' },
    { kindName: '迷你贵宾' },
    { kindName: '藏獒' },
    { kindName: '老虎' },
    { kindName: '狮子' },
    { kindName: '老鼠' },
    { kindName: '熊猫' },
  ], // 大体型
  mediumResponseVos: [
  { kindName: '吉娃娃' },
    { kindName: '贵宾犬' },
    { kindName: '迷你贵宾' },
    { kindName: '藏獒' },
    { kindName: '老虎' },
    { kindName: '狮子' },
    { kindName: '老鼠' },
    { kindName: '熊猫' },
    { kindName: '吉娃娃' },
    { kindName: '贵宾犬' },
    { kindName: '迷你贵宾' },
    { kindName: '藏獒' },
    { kindName: '老虎' },
    { kindName: '狮子' },
    { kindName: '老鼠' },
    { kindName: '熊猫' },
    { kindName: '吉娃娃' },
    { kindName: '贵宾犬' },
    { kindName: '迷你贵宾' },
    { kindName: '藏獒' },
    { kindName: '老虎' },
    { kindName: '狮子' },
    { kindName: '老鼠' },
    { kindName: '熊猫' },
  ], // 中体型
  smallResponseVos: [
  { kindName: '吉娃娃' },
    { kindName: '贵宾犬' },
    { kindName: '迷你贵宾' },
    { kindName: '藏獒' },
    { kindName: '老虎' },
    { kindName: '狮子' },
    { kindName: '老鼠' },
    { kindName: '熊猫' },
    { kindName: '吉娃娃' },
    { kindName: '贵宾犬' },
    { kindName: '迷你贵宾' },
    { kindName: '藏獒' },
    { kindName: '老虎' },
    { kindName: '狮子' },
    { kindName: '老鼠' },
    { kindName: '熊猫' },
    { kindName: '吉娃娃' },
    { kindName: '贵宾犬' },
    { kindName: '迷你贵宾' },
    { kindName: '藏獒' },
    { kindName: '老虎' },
    { kindName: '狮子' },
    { kindName: '老鼠' },
    { kindName: '熊猫' },
  ] // 小体型
}

export default function PetSelect() {
  return (
    <div>
      <SingleSelect title="大型" petTypes={PetTypes.largeResponseVos} />
      <SingleSelect title="中型" petTypes={PetTypes.largeResponseVos} />
      <SingleSelect title="小型" petTypes={PetTypes.largeResponseVos} />
    </div>
  )
}