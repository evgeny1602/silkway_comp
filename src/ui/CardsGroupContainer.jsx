export function CardsGroupContainer({ children }) {
  return (
    <div className="bg-white rounded p-[30px] max-[700px]:p-[10px] flex flex-nowrap flex-col gap-[30px] max-[700px]:gap-[10px]">
      {children}
    </div>
  )
}
