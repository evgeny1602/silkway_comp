import arrowRightIcon from '@/assets/arrow_right_icon.svg'

export function MoreButtonSmall({ onClick, className = null }) {
  let classes =
    'w-[60px] h-[60px] rounded-[50%] bg-silkway-dark-milk flex flex-nowrap items-center justify-center hover:bg-silkway-milk transition-colors'

  if (className) {
    classes += ' ' + className
  }

  return (
    <button onClick={onClick}>
      <div className={classes}>
        <img src={arrowRightIcon} />
      </div>
    </button>
  )
}
