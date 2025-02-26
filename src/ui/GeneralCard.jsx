import { CardContainer } from '../ui/CardContainer'
import { CardProgressBar } from '../ui/CardProgressBar'
import { CardBadge } from '../ui/CardBadge'
import { CardImage } from '../ui/CardImage'
import { CardPricesContainer } from '../ui/CardPricesContainer'
import { CardTitle } from '../ui/CardTitle'
import { CardPrice } from '../ui/CardPrice'
import { CardOldPrice } from '../ui/CardOldPrice'
import { CardRestQty } from '../ui/CardRestQty'
import { CardDiscount } from '../ui/CardDiscount'

export function GeneralCard({
  itemUrl,
  imageUrl,
  name,
  price,
  oldPrice = null,
  discountPercent = null,
  progressPercent = null,
  leftQty = null,
  badge = null,
}) {
  return (
    <CardContainer
      onClick={() => {
        location.href = itemUrl
      }}
    >
      {badge && <CardBadge variant={badge} />}

      <CardImage
        imgUrl={imageUrl}
        title={name}
      />

      <CardPricesContainer>
        <CardPrice
          price={price}
          hasOldPrice={oldPrice}
        />

        {oldPrice && <CardOldPrice oldPrice={oldPrice} />}

        {discountPercent && <CardDiscount percent={discountPercent} />}
      </CardPricesContainer>

      <CardTitle title={name} />

      {progressPercent && <CardProgressBar percent={progressPercent} />}

      {leftQty && <CardRestQty qty={leftQty} />}
    </CardContainer>
  )
}
