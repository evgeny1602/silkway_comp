import { SectionContainer } from '../ui/SectionContainer'
import { SectionInnerContainer } from '../ui/SectionInnerContainer'
import { CardListContainer } from '../ui/CardListContainer'
import { GeneralCard } from '../ui/GeneralCard'

import { getGlobalData, fixURL, itemsCountPostfix } from '../utils'

import { imagesUrlPrefix } from '../config'

function ResultsInfo({ resultsCount }) {
  const postfix = itemsCountPostfix(resultsCount, [
    'результат',
    'результата',
    'результатов',
  ])

  return (
    <div className="border-b border-silkway-dark-milk font-sans text-sm text-silkway-dark-chocolate pb-[15px] mb-[15px]">
      {resultsCount} {postfix}
    </div>
  )
}

export function SearchResults() {
  const { items } = getGlobalData('searchResults')

  return (
    <SectionContainer className="pb-[70px]">
      <SectionInnerContainer>
        <ResultsInfo resultsCount={items.length} />
        <CardListContainer>
          {items.map((item) => (
            <GeneralCard
              key={item.URL}
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
        </CardListContainer>
      </SectionInnerContainer>
    </SectionContainer>
  )
}
