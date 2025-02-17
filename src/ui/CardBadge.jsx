import percentIcon from '@/assets/percent_icon.svg'
import fireIcon from '@/assets/fire_icon.svg'
import auctionIcon from '@/assets/auction_icon.svg'

export function CardBadge({ variant = 'discount' }) {
  const [text, icon, bgColor] = {
    discount: ['Скидка', percentIcon, 'bg-silkway-red'],
    sale: ['Распродажа', fireIcon, 'bg-silkway-orange-sale'],
    auction: ['Аукцион', auctionIcon, 'bg-silkway-blue-auction'],
  }[variant]

  return (
    <span
      className={`${bgColor} rounded flex flex-nowrap font-sans text-white font-medium text-small absolute px-[8px] py-[2px] gap-[3px] top-[6px] right-[6px]`}
    >
      <img src={icon} />
      {text}
    </span>
  )
}
