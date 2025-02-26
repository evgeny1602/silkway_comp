export function CardImage({ imgUrl, title }) {
  return (
    <img
      src={imgUrl}
      alt={title}
      className="rounded w-full h-full min-w-[135px] max-w-[320px] min-h-[135px] max-h-[320px] object-cover aspect-square"
    />
  )
}
