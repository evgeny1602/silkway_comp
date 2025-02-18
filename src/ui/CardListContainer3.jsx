export function CardListContainer3({ children }) {
  return (
    <div className="inline-grid max-[700px]:grid-cols-2 max-[700px]:grid-rows-[auto_auto_auto_auto] max-[1210px]:grid-cols-3 max-[1210px]:grid-rows-[auto] grid-cols-[1fr_1fr_1fr] gap-[30px] max-[700px]:gap-[10px]">
      {children}
    </div>
  )
}
