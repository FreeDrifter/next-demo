// 手机号校验
export function validatePhone(phone: string) {
  return /^1[3456789][0-9]{9}$/g.test(`${phone}`)
}

type ValidatorOption = {
  required?: boolean
}
// 手机号校验 validator
export function getPhoneValidator(option?: ValidatorOption) {
  const { required = true } = option || {}
  return function (rule: unknown, val: string) {
    if (!val) {
      if (!required) return Promise.resolve()
      return Promise.reject(new Error('请输入手机号'))
    }
    if (!validatePhone(val)) {
      return Promise.reject(new Error('请输入正确的手机号'))
    }
    return Promise.resolve()
  }
}

// 邮箱校验
export function validateEmail(email: string) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
}
export function getEmailValidator(option?: ValidatorOption) {
  const { required = true } = option || {}
  return function (rule: unknown, value: string) {
    if (!value) {
      if (!required) return Promise.resolve()
      return Promise.reject(new Error('请输入邮箱'))
    }
    if (!validateEmail(value)) {
      return Promise.reject(new Error('请输入正确的邮箱'))
    }
    return Promise.resolve()
  }
}

// 密码校验
export const MiChongPasswordRuleMsg = '密码必须包括数字、英文字母，长度 6-20 位'
export function validateMiChongPassword(password: string) {
  return /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,20}$/.test(password)
}
// 密码校验 validator
export function passwordValidator(rule: unknown, value: string) {
  if (!value) {
    return Promise.reject(new Error('请输入密码'))
  }

  if (!validateMiChongPassword(value)) {
    return Promise.reject(new Error(MiChongPasswordRuleMsg))
  }

  return Promise.resolve()
}

// 昵称校验
export function nickNameValidator(rule: unknown, value: string) {
  if (!value) {
    return Promise.reject(new Error('请输入昵称'))
  }
  if (value.length < 3 || value.length > 15) {
    return Promise.reject(new Error('昵称长度在 3-15 位'))
  }
  return Promise.resolve()
}

// 英文昵称校验
export function englishNickNameValidator(rule: unknown, value: string) {
  if (!value) {
    return Promise.reject(new Error('请输入英文昵称'))
  }
  if (!/^[a-zA-Z0-9_]+$/.test(value)) {
    return Promise.reject(new Error('只能包含字母、数字、下划线'))
  }
  if (value.length && (value.length < 3 || value.length > 20)) {
    return Promise.reject(new Error('英文昵称长度为 3-20 位'))
  }
  return Promise.resolve()
}

// 长度校验
export function getLengthValidator({ max, min, label = '' }: { max: number; min: number; label?: string }) {
  return (rule: unknown, value: string) => {
    // 此处不做必填校验
    if (!value) return Promise.resolve()
    
    if (value.length < min || value.length > max) {
      return Promise.reject(new Error(`${label}长度必须为 ${min}-${max} 位`))
    }

    return Promise.resolve()
  }
}

export function getArrayEmptyValidator({ msg }: { msg: string }) {
  return function (rule: unknown, value: unknown[]) {
    if (!value || value.length === 0) {
      return Promise.reject(new Error(msg))
    }
    return Promise.resolve()
  }
}