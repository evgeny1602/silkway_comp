import { createRoot } from 'react-dom/client'
import './index.css'

const init = async () => {
  let el

  el = document.getElementById('new-design-header')
  if (el) {
    const { Header } = await import('./Header')
    createRoot(el).render(<Header />)
  }

  el = document.getElementById('footer')
  if (el) {
    const { Footer } = await import('./Footer')
    createRoot(el).render(<Footer />)
  }
}

init()
