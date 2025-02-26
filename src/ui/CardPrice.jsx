import { formatMoney } from '../utils'

export function CardPrice({ price, hasOldPrice = false }) {
  let priceClasses = 'font-sans font-bold text-base'
  if (hasOldPrice) {
    priceClasses += ' text-silkway-red'
  }
  return <div className={priceClasses}>{formatMoney(price)} ₽</div>
}
