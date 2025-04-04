export function Button({
  children,
  variant = 'primary',
  onClick,
  className = null,
  paddingX = null,
  paddingY = null,
  height = 'standart',
  hoverState = 'standart',
}) {
  const basePaddingX = 'px-[15px]'
  const basePaddingY = 'py-[5px]'
  const baseClasses =
    'transition-all duration-200 text-silkway-dark-chocolate rounded items-center border whitespace-nowrap flex flex-nowrap font-sans text-base font-medium justify-center'

  const variantClasses = {
    primary:
      'bg-silkway-orange border-silkway-dark-orange shadow-inner shadow-white/45',
    'primary-dark':
      'border-silkway-dark-chocolate bg-silkway-dark-chocolate text-white shadow-inner shadow-white/45',
    ghost: 'bg-transparent border-silkway-light-gray',
  }

  const variantHoverClasses = {
    standart: {
      primary: 'hover:bg-silkway-light-orange',
      'primary-dark': 'hover:bg-silkway-light-chocolate',
      ghost: 'hover:bg-silkway-light-gray',
    },
    none: {
      primary: '',
      'primary-dark': '',
      ghost: '',
    },
  }

  let classes = [
    baseClasses,
    variantClasses[variant],
    variantHoverClasses[hoverState][variant],
  ].join(' ')

  const heights = {
    standart: 'h-[48px]',
    small: 'h-[36px]',
  }

  classes += ' ' + heights[height]

  if (className) {
    classes += ' ' + className
  }

  classes += ' ' + (paddingX || basePaddingX)
  classes += ' ' + (paddingY || basePaddingY)

  return (
    <button
      className={classes}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
