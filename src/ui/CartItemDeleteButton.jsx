import trashIconImg from '@/assets/trash_icon.svg'

export function CartItemDeleteButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="hover:bg-silkway-light-orange/40 p-[8px] rounded transition-colors"
    >
      <img src={trashIconImg} />
    </button>
  )
}
