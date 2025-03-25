export function CardListContainer({ children, showMoreButton = false }) {
  let classes =
    'justify-items-center inline-grid max-[700px]:grid-cols-2 max-[700px]:grid-rows-[auto_auto_auto_auto] max-[1210px]:grid-cols-3 max-[1210px]:grid-rows-[auto_auto_auto] gap-[30px] max-[700px]:gap-[10px]'

  classes += showMoreButton
    ? ' grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_auto]'
    : ' grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr]'

  return <div className={classes}>{children}</div>
}
