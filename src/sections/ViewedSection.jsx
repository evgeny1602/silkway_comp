import { CardsGroupContainer } from '../ui/CardsGroupContainer'
import { CardsGroupHeader } from '../ui/CardsGroupHeader'
import { CardListContainer3 } from '../ui/CardListContainer3'
import { CardContainer } from '../ui/CardContainer'
import { CardBadge } from '../ui/CardBadge'
import { CardProgressBar } from '../ui/CardProgressBar'
import { ShowMoreWithCountButton } from '../ui/ShowMoreWithCountButton'
import { MoreButton } from '@/ui/MoreButton'
import { getGlobalData, formatMoney, fixURL } from '@/utils'
import { imagesUrlPrefix } from '@/config'

function ViewedCard({ item, className }) {
  let priceClasses = 'font-sans font-bold text-base'

  if (item.OLD_PRICE) {
    priceClasses += ' text-silkway-red'
  }

  return (
    <CardContainer
      className={className}
      onClick={() => {
        location.href = fixURL(imagesUrlPrefix + item.URL)
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
        {(item.OLD_PRICE || false) && (
          <div className="font-medium text-xs text-silkway-gray line-through">
            {formatMoney(item.OLD_PRICE)} ₽
          </div>
        )}
      </div>

      <div className="font-bold text-base">{item.NAME}</div>

      {(item.PROGRESS_PERCENT || false) && (
        <CardProgressBar percent={item.PROGRESS_PERCENT} />
      )}

      {(item.QUANTITY || false) && (
        <div className="text-base">Осталось {item.QUANTITY} шт.</div>
      )}
    </CardContainer>
  )
}

export function ViewedSection({ itemsCount = 3 }) {
  const { total, items, pageUrl } = getGlobalData('viewedSectionData')

  const goPageUrl = () => {
    location.href = pageUrl
  }

  return (
    <CardsGroupContainer>
      <div className="flex flex-nowrap justify-between">
        <CardsGroupHeader>Просмотрено ранее</CardsGroupHeader>
        <ShowMoreWithCountButton
          onClick={goPageUrl}
          total={total}
        />
      </div>

      <CardListContainer3>
        {items.slice(0, itemsCount).map((item) => (
          <ViewedCard
            item={item}
            key={item.URL}
          />
        ))}
        <ViewedCard
          className="min-[700px]:hidden"
          item={items[3]}
        />
      </CardListContainer3>

      <div className="flex flex-nowrap justify-center">
        <MoreButton
          className="min-[1210px]:hidden"
          onClick={goPageUrl}
          text="Показать еще"
        />
      </div>
    </CardsGroupContainer>
  )
}
