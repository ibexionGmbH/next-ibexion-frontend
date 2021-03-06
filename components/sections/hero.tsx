import { getButtonAppearance } from 'utils/button'
import MarkdownRender from 'utils/MarkdownRender'

import ButtonLink from '../elements/button-link'
import CustomImage from '../elements/image'

const Hero = ({ data }) => {
  return (
    <div className="container grid grid-cols-4 grid-flow-row-dense gap-4 justify-between items-center py-12 px-4 rounded-b-md md:grid-cols-8 md:grid-flow-col bg-gecko-gray">
      {/* Left column for content */}
      <div className="col-span-4">
        {/* Hero section label */}
        <p className="font-semibold tracking-wide text-gray-200 uppercase">
          {data.label}
        </p>
        {/* Big title */}
        <h1 className="mt-2 mb-4 text-white sm:mt-0 sm:mb-2 title">
          {data.title}
        </h1>
        {/* Description paragraph */}
        <p className="mb-6 text-xl text-gray-300">{data.description}</p>
        {/* Buttons row */}
        <div className="flex flex-row flex-wrap gap-4">
          {data.buttons.map((button) => (
            <ButtonLink
              button={button}
              appearance={getButtonAppearance(button.type, 'light')}
              key={button.id}
            />
          ))}
        </div>
        {/* Small rich text */}
        <div className="mt-4 text-base sm:mt-3 md:text-sm rich-text-hero">
          <MarkdownRender>{data.smallTextWithLink}</MarkdownRender>
        </div>
      </div>

      {/* Right column for the image */}
      <div className="col-span-4">
        <CustomImage
          media={data?.picture}
          width={750}
          height={650}
          className="object-contain flex-shrink-0 mt-6 w-full sm:w-3/12 md:mt-0 md:w-5/12"
        />
      </div>
    </div>
  )
}

export default Hero
