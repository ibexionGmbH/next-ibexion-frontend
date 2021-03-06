import classNames from 'classnames'

import CustomLink from '../elements/custom-link'
import CustomImage from '../elements/image'
import Video from '../elements/video'

const FeatureRowsGroup = ({ data }) => {
  return (
    <div className="container flex flex-col gap-12 py-12">
      {data.features.map((feature, index) => (
        <div
          className={classNames(
            // Common classes
            'flex flex-col justify-start md:justify-between md:items-center gap-10',
            {
              'lg:flex-row': index % 2 === 0,
              'lg:flex-row-reverse': index % 2 === 1,
            }
          )}
          key={feature.id}
        >
          {/* Text section */}

          <div className="w-full text-lg lg:pr-6 lg:w-6/12">
            <h3 className="text-gray-50 title">{feature.title}</h3>
            <p className="my-6">{feature.description}</p>
            {feature.link ? (
              <CustomLink link={feature.link}>
                <div className="hover:underline text-canary-blue-500 with-arrow">
                  {feature.link?.text}
                </div>
              </CustomLink>
            ) : null}
          </div>
          {/* Media section */}
          <div className="w-full max-h-full lg:w-4/12 sm:9/12">
            {/* Images */}
            {feature?.media?.mime?.startsWith('image') && (
              <CustomImage media={feature?.media} className="w-full h-auto" />
            )}
            {/* Videos */}
            {feature?.media?.mime?.startsWith('video') && (
              <Video
                media={feature?.media}
                className="w-full h-auto"
                autoPlay
                controls={false}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default FeatureRowsGroup
