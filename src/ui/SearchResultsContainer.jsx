export function SearchResultsContainer({ children }) {
  return (
    <div className="flex flex-wrap justify-start gap-[30px] max-[700px]:gap-[10px] relative pb-[70px]">
      {children}
    </div>
  )
}
