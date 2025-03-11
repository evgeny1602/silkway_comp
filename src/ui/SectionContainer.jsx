export function SectionContainer({
  children,
  variant = 'milk',
  className = null,
}) {
  let classes = 'w-full'

  if (variant == 'milk') {
    classes += ' bg-silkway-milk'
  }
  if (variant == 'green') {
    classes += ' bg-silkway-green'
  }
  if (variant == 'white') {
    classes += ' bg-white'
  }

  if (className) {
    classes += ' ' + className
  }

  return <div className={classes}>{children}</div>
}
