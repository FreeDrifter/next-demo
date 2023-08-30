import { PetInfo } from "@/shared/apis/pet"
import { StepsForm } from "@ant-design/pro-components"

export default function PetDescentInfo() {
  return (
    <StepsForm.StepForm<PetInfo>
      title="血统管理"
    >
      血统管理 TODO
    </StepsForm.StepForm>
  )
}