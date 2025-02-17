import chevronDownIcon from '@/assets/chevron_down_icon.svg'

export function MoreButton({ onClick, text, className = null }) {
  let classes =
    'text-silkway-dark-chocolate font-sans text-base font-medium flex flex-nowrap gap-[10px] items-center bg-silkway-dark-milk rounded px-[45px] py-[15px] hover:bg-silkway-light-orange transition-colors h-[48px] max-[1200px]:h-[36px]'

  if (className) {
    classes += ' ' + className
  }

  return (
    <button
      onClick={onClick}
      className={classes}
    >
      {text} <img src={chevronDownIcon} />
    </button>
  )
}
