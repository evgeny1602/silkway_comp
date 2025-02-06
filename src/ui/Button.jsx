export function Button({
  children,
  variant = 'primary',
  onClick,
  className = null,
  paddingX = null,
  paddingY = null,
}) {
  const basePaddingX = 'px-[15px]'
  const basePaddingY = 'py-[5px]'
  const baseClasses =
    'transition-all duration-200 text-silkway-dark-chocolate rounded items-center border whitespace-nowrap flex flex-nowrap font-sans text-base font-medium justify-center h-[48px]'

  const variantClasses = {
    primary:
      'bg-silkway-orange hover:bg-silkway-light-orange border-silkway-dark-orange shadow-inner shadow-white/45',
    'primary-dark':
      'border-silkway-dark-chocolate bg-silkway-dark-chocolate hover:bg-silkway-light-chocolate text-white shadow-inner shadow-white/45',
    ghost:
      'bg-transparent hover:bg-silkway-light-gray border-silkway-light-gray',
  }

  let classes = [baseClasses, variantClasses[variant]].join(' ')

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
