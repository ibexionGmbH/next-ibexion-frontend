import * as React from 'react'

import CustomLink from '../elements/custom-link'
import CustomImage from '../elements/image'

interface IImageSectionProps {
  data: {
    component: string
    id: number
    imageBorder: boolean
    width: number
    height: number
    link: null
    picture: IMedia
  }
}

const ImageSection: React.FunctionComponent<IImageSectionProps> = ({
  data,
}) => {
  return (
    <div className="container grid grid-cols-1 mx-auto max-w-prose md:max-w-screen-md lg:max-w-screen-lg">
      {data.link ? (
        <CustomLink link={data?.link}>
          <CustomImage
            media={data?.picture}
            width={data.width || 1024}
            height={data.height || 768}
            className="object-contain mx-auto w-full"
          />
        </CustomLink>
      ) : (
        <CustomImage
          media={data?.picture}
          width={data.width || 1024}
          height={data.height || 768}
          className="object-contain mx-auto w-full"
        />
      )}
    </div>
  )
}

export default ImageSection
