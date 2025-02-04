import { createPortal } from 'react-dom'

export function ReactPortal({ children }) {
  const element = document.getElementById('react-modal-wrapper')

  if (!element) {
    return null
  }

  return createPortal(children, element)
}
