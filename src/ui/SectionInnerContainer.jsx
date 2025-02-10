export function SectionInnerContainer({ children, className = null }) {
  let classes =
    'm-auto max-w-[1670px] px-[10px] header-4:px-[50px] header-9:px-[20px] header-5:px-[50px]'
  if (className) {
    classes += ' ' + className
  }

  return <div className={classes}>{children}</div>
}
