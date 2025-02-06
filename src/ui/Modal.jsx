import { ReactPortal } from '@/ui/ReactPortal'
import crossIconImg from '@/assets/cross_icon.svg'
import { ModalOverlay } from '@/ui/ModalOverlay'

function CloseModalButton({ onClick }) {
  return (
    <div className="w-full flex flex-nowrap justify-end">
      <img
        onClick={onClick}
        src={crossIconImg}
        className="-mt-4 -mr-4 cursor-pointer hover:bg-silkway-milk p-2 rounded transition-colors duration-200"
      />
    </div>
  )
}

export function Modal({ children, isVisible, onClose, overlayZIndex = 70 }) {
  if (!isVisible) {
    return null
  }

  return (
    <ReactPortal>
      <ModalOverlay zIndex={overlayZIndex} />
      <div className="p-6 bg-white rounded shadow-md h-[200px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[80]">
        <CloseModalButton onClick={onClose} />
        {children}
      </div>
    </ReactPortal>
  )
}
