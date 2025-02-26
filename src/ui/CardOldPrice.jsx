import { formatMoney } from '../utils'

export function CardOldPrice({ oldPrice }) {
  return (
    <div className="font-medium text-xs text-silkway-gray line-through">
      {formatMoney(oldPrice)} ₽
    </div>
  )
}
