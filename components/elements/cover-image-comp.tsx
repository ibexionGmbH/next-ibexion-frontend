import { ReactElement } from 'react'
import Image from 'next/image'
import cx from 'classnames'

interface ImageItem {
  fullUrl: string
  alt: string
  title: string
  image_border: boolean
  height?: number
  width?: number
}

export default function CoverImageComp({
  fullUrl,
  alt,
  title,
  image_border,
  height,
  width,
}: ImageItem): ReactElement {
  return (
    <div
      className={cx('block container mx-auto ', {
        'border-b-8 border-canary-blue': image_border === true,
      })}
    >
      <Image
        src={fullUrl}
        alt={alt}
        title={title}
        layout="responsive"
        className=""
        width={width || 1920}
        height={height || 1080}
      />
    </div>
  )
}
