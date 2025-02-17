export function CardContainer({ onClick, children }) {
  return (
    <div
      onClick={onClick}
      className="font-sans rounded flex flex-nowrap flex-col relative gap-[10px] mb-[40px] cursor-pointer hover:scale-105 transition-all duration-1000"
    >
      {children}
    </div>
  )
}
