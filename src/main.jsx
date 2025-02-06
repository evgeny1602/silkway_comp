import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import './index.css'

const init = async () => {
  let el

  el = document.getElementById('new-design-header')
  if (el) {
    const { Header } = await import('./sections/Header')
    createRoot(el).render(
      <StrictMode>
        <Header />
      </StrictMode>
    )
  }

  el = document.getElementById('footer')
  if (el) {
    const { Footer } = await import('./sections/Footer')
    createRoot(el).render(
      <StrictMode>
        <Footer />
      </StrictMode>
    )
  }
}

init()
