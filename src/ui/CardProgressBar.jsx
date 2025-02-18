export function CardProgressBar({ percent }) {
  return (
    <div className="h-[7px] w-full bg-silkway-dark-milk rounded">
      <div
        className="h-[7px] bg-silkway-orange rounded"
        style={{
          width: `${percent}%`,
        }}
      ></div>
    </div>
  )
}
