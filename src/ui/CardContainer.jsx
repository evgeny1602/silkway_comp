export function CardContainer({ onClick, children, className = null }) {
  let classes =
    'font-sans rounded flex flex-nowrap flex-col relative gap-[10px] mb-[40px] cursor-pointer hover:scale-105 transition-all duration-1000 min-w-[135px] max-w-[210px] w-full'

  if (className) {
    classes += ' ' + className
  }

  return (
    <div
      onClick={onClick}
      className={classes}
    >
      {children}
    </div>
  )
}
