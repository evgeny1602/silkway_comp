import { SectionContainer } from '../ui/SectionContainer'
import { SectionInnerContainer } from '../ui/SectionInnerContainer'
import { GeneralCard } from '../ui/GeneralCard'
import { Pagination } from '../ui/Pagination'
import { SearchResultsLoader } from '../ui/SearchResultsLoader'
import { ResultsInfo } from '../ui/ResultsInfo'
import { SearchResultsContainer } from '../ui/SearchResultsContainer'

import { getGlobalData, fixURL } from '../utils'
import { imagesUrlPrefix } from '../config'
import { fetchData } from '@/api/fetcher'
import { useState } from 'react'

export function SearchResults() {
  const {
    items: initItems,
    items_total: initItemsTotal,
    page_size: pageSize,
    url,
    iblock_id: iblockId,
    action,
    q,
    page_num: pageNum,
  } = getGlobalData('searchResults')

  const [items, setItems] = useState(initItems)
  const [itemsTotal, setItemsTotal] = useState(initItemsTotal)
  const [isLoading, setIsLoading] = useState(false)

  const handlePageClick = async (pageNum) => {
    const json = await fetchData(
      url,
      'post',
      {
        action,
        iblock_id: iblockId,
        q,
        page_size: pageSize,
        page_num: pageNum,
      },
      setIsLoading
    )
    setItems(json.items)
    setItemsTotal(json.items_total)
  }

  return (
    <SectionContainer className="pb-[70px]">
      <SectionInnerContainer>
        <ResultsInfo
          resultsCount={itemsTotal}
          isLoading={isLoading}
        />

        <SearchResultsContainer>
          {isLoading && <SearchResultsLoader />}

          {items.map((item) => (
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
        </SearchResultsContainer>

        <Pagination
          isClickable={!isLoading}
          itemsTotal={itemsTotal}
          pageSize={pageSize}
          initPageNum={pageNum}
          onPageClick={handlePageClick}
        />
      </SectionInnerContainer>
    </SectionContainer>
  )
}
