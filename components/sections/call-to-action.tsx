import React, { ReactElement } from 'react'
import ButtonLink from '../elements/button-link'
import CustomButton from '../elements/custom-button'
import CustomLink from '../elements/custom-link'

interface CallToAction {
  data: Item
}

interface Item {
  title: string
  Link: ILink
}

export default function CallToAction({ data }: CallToAction): ReactElement {
  return (
    <div className="container py-12 mx-auto px-4 sm:px-6 md:px-9  md:max-w-prose">
      <h2 className="text-3xl font-bold leading-7 text-white mb-2">
        {data.title}
      </h2>
      <CustomLink link={data.Link}>
        <CustomButton text={data.Link.text} />
      </CustomLink>
    </div>
  )
}
