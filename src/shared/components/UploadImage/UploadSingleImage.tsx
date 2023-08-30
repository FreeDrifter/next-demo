import { ImageInfo } from '../../apis/user'
import UploadMultImage, { UploadImageProps } from './UploadMultImage'

type UploadSingleImageProps = UploadImageProps & {
  value?: ImageInfo
  onChange?: (val?: ImageInfo) => void
}

export default function UploadSingleImage(props: UploadSingleImageProps) {

  function onImagesChanged(imgList: ImageInfo[]) {
    const hasImg = imgList && imgList.length
    props.onChange && props.onChange(hasImg ? imgList[0] : undefined)
  }

  return (
    <UploadMultImage
      {...props}
      value={props.value && [props.value]}
      onChange={onImagesChanged}
      max={1}
    />
  )
}