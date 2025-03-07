import { imagesUrlPrefix } from '../config'
import { useProducts } from '@/hooks/products'
import { useProductsFiltersStore } from '@/stores/productsFiltersStore'
import { fixURL } from '@/utils'

import { SearchResultsContainer } from '@/ui/SearchResultsContainer'
import { GeneralCard } from '@/ui/GeneralCard'
import { SearchResultsLoader } from '@/ui/SearchResultsLoader'
import { BlankCard } from '@/ui/BlankCard'

export function SearchResults() {
  const filtersPrev = useProductsFiltersStore((state) => state.filtersPrev)
  const qPrev = useProductsFiltersStore((state) => state.qPrev)
  const pageSize = useProductsFiltersStore((state) => state.pageSize)
  const pageNum = useProductsFiltersStore((state) => state.pageNum)
  const sectionIdPrev = useProductsFiltersStore((state) => state.sectionIdPrev)

  const { data, isLoading } = useProducts(
    filtersPrev,
    pageSize,
    pageNum,
    sectionIdPrev,
    qPrev
  )

  const items = data?.items || []

  return (
    <SearchResultsContainer>
      {isLoading && <SearchResultsLoader />}

      {isLoading &&
        new Array(pageSize).fill(0).map((item, idx) => <BlankCard key={idx} />)}

      {!isLoading &&
        items.map((item) => (
          <GeneralCard
            key={item.ID}
            itemUrl={fixURL(imagesUrlPrefix + item.URL)}
            imageUrl={fixURL(imagesUrlPrefix + item.DETAIL_PICTURE)}
            name={item.NAME}
            price={item.PRICE}
            oldPrice={item.OLD_PRICE || null}
            discountPercent={item.DISCOUNT_PERCENT || null}
            progressPercent={item.PROGRESS_PERCENT || null}
            leftQty={item.QUANTITY || null}
            badge={item.BADGE || null}
          />
        ))}

      {!isLoading &&
        new Array(pageSize - items.length).fill(0).map((item, idx) => (
          <BlankCard
            key={idx}
            visible={false}
          />
        ))}
    </SearchResultsContainer>
  )
}
