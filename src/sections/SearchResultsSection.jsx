import { SectionContainer } from '../ui/SectionContainer'
import { SectionInnerContainer } from '../ui/SectionInnerContainer'
import { Pagination } from '../ui/Pagination'
import { ResultsInfo } from '../ui/ResultsInfo'
import { SearchResults } from '@/ui/SearchResults'

export function SearchResultsSection() {
  return (
    <SectionContainer className="pb-[70px]">
      <SectionInnerContainer>
        <ResultsInfo />
        <SearchResults />
        <Pagination />
      </SectionInnerContainer>
    </SectionContainer>
  )
}
