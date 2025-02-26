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
import { CardDiscount } from '../ui/CardDiscount'
import { CardImage } from '../ui/CardImage'
import { CardPrice } from '../ui/CardPrice'
import { CardOldPrice } from '../ui/CardOldPrice'
import { CardPricesContainer } from '../ui/CardPricesContainer'
import { CardTitle } from '../ui/CardTitle'
import { getGlobalData, fixURL } from '@/utils'
import { imagesUrlPrefix } from '@/config'

function BestsellerCard({ item }) {
  let priceClasses = 'font-sans font-bold text-base'
  if (item.OLD_PRICE) {
    priceClasses += ' text-silkway-red'
  }

  const handleClick = () => {
    location.href = fixURL(imagesUrlPrefix + item.URL)
  }

  return (
    <CardContainer onClick={handleClick}>
      <CardBadge variant="discount" />

      <CardImage
        imgUrl={item.DETAIL_PICTURE}
        title={item.NAME}
      />

      <CardPricesContainer>
        <CardPrice
          price={item.PRICE}
          hasOldPrice={item.OLD_PRICE}
        />

        {item.OLD_PRICE && <CardOldPrice oldPrice={item.OLD_PRICE} />}

        {item.DISCOUNT_PERCENT && (
          <CardDiscount percent={item.DISCOUNT_PERCENT} />
        )}
      </CardPricesContainer>

      <CardTitle title={item.NAME} />
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
