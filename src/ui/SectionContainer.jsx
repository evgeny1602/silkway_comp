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

  if (className) {
    classes += ' ' + className
  }

  return (
    <div className={classes}>
      <div className="m-auto max-w-[1670px] px-[10px] header-4:px-[50px] header-9:px-[20px] header-5:px-[50px]">
        {children}
      </div>
    </div>
  )
}
