import { SectionContainer } from '@/ui/SectionContainer'
import { SectionInnerContainer } from '@/ui/SectionInnerContainer'
import { MoreButton } from '@/ui/MoreButton'
import { MoreButtonSmall } from '@/ui/MoreButtonSmall'
import { CardsGroupContainer } from '../ui/CardsGroupContainer'
import { CardsGroupHeader } from '../ui/CardsGroupHeader'
import { CardListContainer } from '../ui/CardListContainer'
import { ShowMoreButtonContainer } from '../ui/ShowMoreButtonContainer'
import { CardBadge } from '../ui/CardBadge'
import { getGlobalData } from '@/utils'
import { imagesUrlPrefix } from '@/config'
import { formatMoney } from '../utils'

function CardContainer({ onClick, children }) {
  return (
    <div
      onClick={onClick}
      className="font-sans rounded flex flex-nowrap flex-col relative gap-[10px] mb-[40px] cursor-pointer hover:scale-105 transition-all duration-1000"
    >
      {children}
    </div>
  )
}

function BestsellerCard({ item }) {
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
      <CardBadge variant="discount" />
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

        {item.DISCOUNT_PERCENT && (
          <div className="font-medium text-xs text-silkway-red">
            -{item.DISCOUNT_PERCENT}%
          </div>
        )}
      </div>

      <div className="font-bold text-base">{item.NAME}</div>
    </CardContainer>
  )
}

export function BestsellersSection({ itemsCount = 6 }) {
  const { items, pageUrl } = getGlobalData('bestsellersSectionData')

  const goPageUrl = () => {
    location.href = pageUrl
  }

  return (
    <SectionContainer className="pb-[70px] max-[874px]:pb-[50px]">
      <SectionInnerContainer>
        <CardsGroupContainer>
          <CardsGroupHeader>Хиты продаж</CardsGroupHeader>
          <CardListContainer>
            {items.slice(0, itemsCount).map((item) => (
              <BestsellerCard
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
