import { SectionContainer } from '@/ui/SectionContainer'
import { SectionInnerContainer } from '@/ui/SectionInnerContainer'
import { FavoritesSection } from './FavoritesSection'
import { ViewedSection } from './ViewedSection'

export function FavoritesViewedSection(props) {
  return (
    <SectionContainer className="pb-[70px] max-[874px]:pb-[50px]">
      <SectionInnerContainer>
        <div className="flex flex-nowrap justify-center max-[1150px]:flex-wrap gap-[30px]">
          <FavoritesSection />
          <ViewedSection />
        </div>
      </SectionInnerContainer>
    </SectionContainer>
  )
}
