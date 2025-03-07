import { useProductsFiltersStore } from '../stores/productsFiltersStore'

import { SectionContainer } from '@/ui/SectionContainer'
import { SectionInnerContainer } from '@/ui/SectionInnerContainer'
import { ResultsInfo } from '@/ui/ResultsInfo'
import { SearchResults } from '@/ui/SearchResults'
import { Pagination } from '@/ui/Pagination'
import { AccordionFilters } from '@/ui/AccordionFilters'
import { FloatFilterResults } from '../ui/FloatFilterResults'

export function CatalogItems() {
  const syncPrev = useProductsFiltersStore((state) => state.syncPrev)
  const resetFloatY = useProductsFiltersStore((state) => state.resetFloatY)

  const showResults = () => {
    syncPrev()
    resetFloatY()
  }

  return (
    <SectionContainer>
      <SectionInnerContainer>
        <div className="flex flex-nowrap gap-[30px] max-[1190px]:flex-col">
          <div>
            <div className="w-[370px] max-[1190px]:w-full bg-white rounded p-[15px]">
              <AccordionFilters onShowResultsClick={showResults} />
              <FloatFilterResults onClick={showResults} />
            </div>
          </div>
          <div>
            <ResultsInfo />
            <SearchResults />
            <Pagination />
          </div>
        </div>
      </SectionInnerContainer>
    </SectionContainer>
  )
}
