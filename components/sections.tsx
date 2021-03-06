import { useRouter } from 'next/router'

import BottomActions from '@/components/sections/bottom-actions'
import FeatureColumnsGroup from '@/components/sections/feature-columns-group'
import FeatureRowsGroup from '@/components/sections/feature-rows-group'
import Hero from '@/components/sections/hero'
import LargeVideo from '@/components/sections/large-video'
import TestimonialsGroup from '@/components/sections/testimonials-group'

import CallToAction from './sections/call-to-action'
import CoverImage from './sections/cover-image'
import DangerousHTML from './sections/dangerous-html'
import DynamicRichText from './sections/dynamic-rich-text'
import IbexionLoadingBar from './sections/ibexion-loadingbar'
import ImageSection from './sections/image-section'
import LeadForm from './sections/lead-form'
import LevelModel from './sections/level-model'
import Parallax from './sections/parallax'
import Pricing from './sections/pricing'
import RichText from './sections/rich-text'

// Map Strapi sections to section components
const sectionComponents = {
  'sections.hero': Hero,
  'sections.large-video': LargeVideo,
  'sections.feature-columns-group': FeatureColumnsGroup,
  'sections.feature-rows-group': FeatureRowsGroup,
  'sections.bottom-actions': BottomActions,
  'sections.testimonials-group': TestimonialsGroup,
  'sections.rich-text': RichText,
  'sections.pricing': Pricing,
  'sections.lead-form': LeadForm,
  'sections.level-model': LevelModel,
  'sections.image': ImageSection,
  'sections.dynamic-content': DynamicRichText,
  'sections.dangerous-html': DangerousHTML,
  'sections.coverimage': CoverImage,
  'sections.call-to-action': CallToAction,
  'sections.ibexion-loading-bar': IbexionLoadingBar,
  'sections.parallax': Parallax,
}

// Display a section individually
const Section = ({ sectionData }) => {
  // Prepare the component
  const SectionComponent = sectionComponents[sectionData.__component]

  if (!SectionComponent) {
    return null
  }

  // Display the section

  //console.log(sectionData)

  return <SectionComponent data={sectionData} />
}

const PreviewModeBanner = () => {
  const router = useRouter()
  const exitURL = `/api/exit-preview?redirect=${encodeURIComponent(
    router.asPath
  )}`

  return (
    <div className="py-4 font-semibold tracking-wide text-red-100 uppercase bg-red-600">
      <div className="container">
        Preview mode is on.{' '}
        <a
          className="underline"
          href={`/api/exit-preview?redirect=${router.asPath}`}
        >
          Turn off
        </a>
      </div>
    </div>
  )
}

// Display the list of sections
const Sections = ({ sections, preview }) => {
  return (
    <div className="flex flex-col">
      {/* Show a banner if preview mode is on */}
      {preview && <PreviewModeBanner />}
      {/* Show the actual sections */}
      {sections?.map((section) => (
        <Section
          sectionData={section}
          key={`${section.__component}${section.id}`}
        />
      ))}
    </div>
  )
}

export default Sections
