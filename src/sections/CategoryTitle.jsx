import { getGlobalData } from '../utils'

import { SectionContainer } from '../ui/SectionContainer'
import { SectionInnerContainer } from '../ui/SectionInnerContainer'

export function CategoryTitle() {
  let items = getGlobalData('breadcrumbsData')
  const titleText = items.at(-1).name

  return (
    <SectionContainer>
      <SectionInnerContainer>
        <div className="py-[45px] max-[600px]:py-[20px] font-sans font-semibold text-5xl max-[600px]:text-2xl text-silkway-dark-chocolate">
          {titleText}
        </div>
      </SectionInnerContainer>
    </SectionContainer>
  )
}
