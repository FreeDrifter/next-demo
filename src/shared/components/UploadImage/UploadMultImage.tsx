'use client'

import { ImageInfo } from '@/shared/apis/user'
import Image from 'next/image'
import styles from './index.module.scss'
import { EyeOutlined, DeleteOutlined, PlusOutlined, PictureOutlined } from '@ant-design/icons'
import React, { ChangeEvent, useState } from 'react'
import { forEach, uniqueId } from 'lodash'
import { loadDialog } from '@/shared/utils/dialog'
import { Image as AntImage } from 'antd'
import { uploadFile } from '@/shared/utils/upload'

const ImageSize = 102 // 图片大小 102px
const DefaultMaxCount = 5 // 默认最多上传 5 张

export type UploadImageProps = {
  value?: ImageInfo[]
  onChange?: (val: ImageInfo[]) => void
  max?: number
  className?: string
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
  disabled?: boolean
  width?: number
  height?: number
  placeholder?: string
}

type ImageRenderOptions = {
  preview: (image: UploadingImage) => void
  remove: (image: UploadingImage) => void
}

/**
 * 图片上传
 * 包含 上传、展示、进度条 等功能
 */
export default function UploadMultImage(props: UploadImageProps) {
  const { max = DefaultMaxCount, width = ImageSize, height = ImageSize } = props
  const { imageList, onFileUpload, setImageList } = useImageUpload(props)

  function preview(imageInfo: UploadingImage) {
    const ctx = loadDialog(AntImage, {
      style: { display: 'none' },
      src: imageInfo.url,
      preview: {
        visible: true,
        onVisibleChange: () => {
          ctx.unmount()
        }
      },
    })
  }

  function remove(imageInfo: UploadingImage) {
    const index = imageList.indexOf(imageInfo)
    const newImages = [...imageList]
    newImages.splice(index, 1)
    setImageList(newImages)
  }
  
  return (
    <div className={`${styles.uploadBox} ${props.className}`}>
      {
        imageList.map((imageInfo, index) => {
          const options = { preview, remove }
          
          let imageBoxNode: React.ReactNode
          if (imageInfo.loading) {
            imageBoxNode = ImageUploadingBox(imageInfo, props)
          } else if (imageInfo.error) {
            imageBoxNode = ImageErrorBox(imageInfo, options, props)
          } else {
            imageBoxNode = ImageSuccessBox(imageInfo, options, props)
          }
          return (
            <div className={styles.imageBox} key={index}>
              {imageBoxNode}
            </div>
          )
        })
      }
      {/* 上传按钮 */}
      {
        imageList.length < max && !props.disabled && (
          <div className={`${styles.imageItem} ${styles.imageUploadItem}`} style={{ width: `${width}px`, height: `${height}px` }}>
            <div className={`${styles.center} ${styles.colorForeground}`}>
              <div className='text-center'><PlusOutlined /></div>
              <div className='mt-2 text-center'>{`${props.placeholder || '上传图片'}`}</div>
            </div>
            <input type='file' className={styles.imageUploadBtn} accept='image/*' onChange={onFileUpload} />
          </div>
        )
      }
      
    </div>
  )
}

/* 成功展示 */
function ImageSuccessBox(imageInfo: UploadingImage, options: ImageRenderOptions, props: UploadImageProps) {
  const { width = ImageSize, height = ImageSize } = props
  return (
    <div className={styles.imageItem} style={{ width: `${width}px`, height: `${height}px` }}>
      {/* 图片展示 */}
      <Image style={{ objectFit: props.objectFit }} src={imageInfo.url} alt='' width={props.width || ImageSize} height={props.height || ImageSize} className={styles.imageShow} />
      
      {/* hover 按钮 */}
      <div className={styles.imageMask}>
        <div className={`${styles.center} text-center`}>
          <EyeOutlined className={`${styles.maskIcon}`} onClick={() => options.preview(imageInfo)} />
          {
            !props.disabled && (
              <DeleteOutlined className={`ml-2 ${styles.maskIcon}`} onClick={() => options.remove(imageInfo)} />
            )
          }
        </div>
      </div>
    </div>
  )
}

/* 上传中的展示 */
function ImageUploadingBox(imageInfo: UploadingImage, props: UploadImageProps) {
  const { width = ImageSize, height = ImageSize } = props
  return (
    <div className={styles.imageUploadingItem} style={{ width: `${width}px`, height: `${height}px` }}>
      <div className={`${styles.center} ${styles.colorForeground}`}>
        <div className='text-center'>文件上传中</div>
        <div className={`${styles.uploadProgress} mt-2`}>
          <div className={styles.uploadLine} style={{ width: `${imageInfo.progress}%` }} />
        </div>
      </div>
    </div>
  )
}

/* 上传失败的展示 */
function ImageErrorBox(imageInfo: UploadingImage, options: ImageRenderOptions, props: UploadImageProps) {
  const { width = ImageSize, height = ImageSize } = props
  return (
    <div className={styles.imageErrorItem} style={{ width: `${width}px`, height: `${height}px` }}>
      <div className={`${styles.center} ${styles.colorError} ${styles.imageInner}`}>
        <div className='text-center'><PictureOutlined className="text-xl" /></div>
        {
          imageInfo.fileName && (
            <div className='mt-2 text-center truncate'>
              {imageInfo.fileName}
            </div>
          )
        }
      </div>

      <div className={styles.imageMask}>
        <div className={`${styles.center} text-center`}>
          <DeleteOutlined
            className={styles.maskIcon}
            onClick={() => options.remove(imageInfo)}
          />
        </div>
      </div>
    </div>
  )
}

type UploadingImage = ImageInfo & {
  progress?: number // 0 - 100
  loaded?: boolean
  loading?: boolean
  error?: boolean
  id?: string
  fileName?: string
}

function useImageUpload(props: UploadImageProps) {
  const [imageList, setImageList] = useState<UploadingImage[]>([...(props.value || [])])
  
  function onFileUpload(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files || []
    forEach(files, (file) => {
      // todo cc 做尺寸等限制
      uploadImage(file)
    })
    e.target.value = ''
  }

  async function uploadImage(file: File) {
    const id = uniqueId()
    const newImageInfo = generateImageInfo(id, file)
    
    setImageList([...imageList, newImageInfo])

    uploadFile({
      file,
      onProgress({ percent }) {
        // 设置进度
        setImageInfo(id, {
          ...newImageInfo,
          progress: percent,
        })
      },
      onError() {
        setImageInfo(id, {
          ...newImageInfo,
          loading: false,
          error: true,
        })
      },
      async onComplete(url) {
        const newList = await setImageInfo(id, {
          ...newImageInfo,
          loaded: true,
          loading: false,
          url: url
        })
        props.onChange && props.onChange(newList)
      }
    })

  }

  // 修改单项图片信息
  function setImageInfo(id: string, newImageInfo: UploadingImage): Promise<UploadingImage[]> {
    return new Promise(resolve => {
      setImageList((prevImageList) => {
        const newList = prevImageList.map(imageInfo => {
          const isSame = imageInfo.id && imageInfo.id === id
          return isSame ? newImageInfo : imageInfo
        })
        resolve(newList)
        return newList
      })
    })
  }

  return {
    imageList,
    onFileUpload,
    setImageList,
  }
}

function generateImageInfo(id: string, file: File): UploadingImage {
  return {
    id,
    url: '',
    progress: 0,
    loaded: false,
    loading: true,
    fileName: file.name,
    isCover: false,
    width: '0',
    height: '0',
    size: `${file.size}`
  }
}