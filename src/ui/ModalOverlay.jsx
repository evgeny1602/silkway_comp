export function ModalOverlay({ zIndex = 70 }) {
  return (
    <div
      className={`w-full h-full bg-silkway-green/60 absolute top-0 left-0 backdrop-blur-md z-[${zIndex}]`}
    ></div>
  )
}
