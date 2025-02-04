import { useEffect } from 'react'

export function useOutsideClick(refs, callback) {
  useEffect(() => {
    if (!Array.isArray(refs)) {
      return
    }

    const handleClickOutside = (e) => {
      for (let ref of refs) {
        if (ref.current && ref.current.contains(e.target)) {
          return
        }
      }
      callback(e)
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })
}
