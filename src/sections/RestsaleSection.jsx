import { SectionContainer } from '@/ui/SectionContainer'
import { SectionInnerContainer } from '@/ui/SectionInnerContainer'
import { MoreButton } from '@/ui/MoreButton'
import { MoreButtonSmall } from '@/ui/MoreButtonSmall'
import { CardsGroupContainer } from '../ui/CardsGroupContainer'
import { CardsGroupHeader } from '../ui/CardsGroupHeader'
import { CardListContainer } from '../ui/CardListContainer'
import { ShowMoreButtonContainer } from '../ui/ShowMoreButtonContainer'
import { CardContainer } from '../ui/CardContainer'
import { CardBadge } from '../ui/CardBadge'
import { CardProgressBar } from '../ui/CardProgressBar'
import { getGlobalData } from '@/utils'
import { imagesUrlPrefix } from '@/config'
import { formatMoney } from '../utils'

function RestsaleCard({ item }) {
  let priceClasses = 'font-sans font-bold text-base'
  if (item.OLD_PRICE) {
    priceClasses += ' text-silkway-red'
  }

  return (
    <CardContainer
      onClick={() => {
        location.href = imagesUrlPrefix + item.URL
      }}
    >
      <CardBadge variant="sale" />
      <img
        src={`${imagesUrlPrefix}${item.DETAIL_PICTURE}`}
        alt={item.NAME}
        className="rounded w-full h-full min-w-[135px] max-w-[320px] min-h-[135px] max-h-[320px] object-cover aspect-square"
      />
      <div className="flex flex-nowrap justify-start gap-[5px]">
        <div className={priceClasses}>{formatMoney(item.PRICE)} ₽</div>
        {item.OLD_PRICE && (
          <div className="font-medium text-xs text-silkway-gray line-through">
            {formatMoney(item.OLD_PRICE)} ₽
          </div>
        )}
      </div>

      <div className="font-bold text-base">{item.NAME}</div>

      {item.PROGRESS_PERCENT && (
        <CardProgressBar percent={item.PROGRESS_PERCENT} />
      )}

      {item.QUANTITY && (
        <div className="text-base">Осталось {item.QUANTITY} шт.</div>
      )}
    </CardContainer>
  )
}

export function RestsaleSection({ itemsCount = 6 }) {
  const { items, pageUrl } = getGlobalData('restSaleSectionData')

  const goPageUrl = () => {
    location.href = pageUrl
  }

  return (
    <SectionContainer className="pb-[70px] max-[874px]:pb-[50px]">
      <SectionInnerContainer>
        <CardsGroupContainer>
          <CardsGroupHeader>Распродажа остатков</CardsGroupHeader>
          <CardListContainer>
            {items.slice(0, itemsCount).map((item) => (
              <RestsaleCard
                item={item}
                key={item.URL}
              />
            ))}
            <ShowMoreButtonContainer>
              <MoreButton
                className="min-[1210px]:hidden"
                onClick={goPageUrl}
                text="Показать еще"
              />
              <MoreButtonSmall
                className="max-[1210px]:hidden"
                onClick={goPageUrl}
              />
            </ShowMoreButtonContainer>
          </CardListContainer>
        </CardsGroupContainer>
      </SectionInnerContainer>
    </SectionContainer>
  )
}
