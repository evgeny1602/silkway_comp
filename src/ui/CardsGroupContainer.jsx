export function CardsGroupContainer({ children, className = null }) {
  let classes =
    'bg-white rounded p-[30px] max-[700px]:p-[10px] flex flex-nowrap flex-col gap-[30px] max-[700px]:gap-[10px]'

  if (className) {
    classes += ' ' + className
  }

  return <div className={classes}>{children}</div>
}
