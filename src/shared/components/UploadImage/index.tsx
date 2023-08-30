import UploadMultImage, { UploadImageProps } from './UploadMultImage'
import UploadSingleImage from './UploadSingleImage'

export default function UploadImage(props: UploadImageProps) {
  return (
    <UploadMultImage {...props} />
  )
}

UploadImage.Single = UploadSingleImage
UploadImage.Mult = UploadMultImage