import loaderAnimation from '../assets/loader.gif'

import { SectionContainer } from '../ui/SectionContainer'
import { SectionInnerContainer } from '../ui/SectionInnerContainer'
import { GeneralCard } from '../ui/GeneralCard'
import { Pagination } from '../ui/Pagination'

import { getGlobalData, fixURL, itemsCountPostfix } from '../utils'

import { imagesUrlPrefix } from '../config'
import { useState } from 'react'

function ResultsInfo({ resultsCount, isLoading }) {
  const postfix = itemsCountPostfix(resultsCount, [
    'результат',
    'результата',
    'результатов',
  ])

  return (
    <div className="border-b border-silkway-dark-milk font-sans text-sm text-silkway-dark-chocolate pb-[15px] mb-[15px]">
      {isLoading ? 'Загрузка...' : `${resultsCount} ${postfix}`}
    </div>
  )
}

function SearchResultsLoader() {
  return (
    <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 z-10 bg-silkway-milk/85">
      <img
        className="scale-[2] opacity-75"
        src={loaderAnimation}
      />
    </div>
  )
}

function SearchResultsContainer({ children }) {
  return (
    <div className="flex flex-wrap justify-start gap-[30px] max-[700px]:gap-[10px] relative">
      {children}
    </div>
  )
}

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

  const fetchData = async (url, method, reqData) => {
    const body = new FormData()

    for (let k in reqData) {
      body.append(k, reqData[k])
    }

    setIsLoading(true)

    const resp = await fetch(url, { method, body })

    if (!resp.ok) {
      throw new Error(resp.statusText)
    }

    const json = await resp.json()

    setIsLoading(false)

    return json
  }

  const handlePageClick = async (pageNum) => {
    const json = await fetchData(url, 'post', {
      action,
      iblock_id: iblockId,
      q,
      page_size: pageSize,
      page_num: pageNum,
    })
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
