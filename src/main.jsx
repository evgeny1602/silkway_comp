import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import './index.css'

const intHeader = async () => {
  const el = document.getElementById('new-design-header')
  if (!el) {
    return
  }
  const { Header } = await import('./sections/Header')
  createRoot(el).render(
    <StrictMode>
      <Header />
    </StrictMode>
  )
}

const initHeroSection = async () => {
  const el = document.getElementById('hero-section')
  if (!el) {
    return
  }
  const { HeroSection } = await import('./sections/HeroSection')
  createRoot(el).render(
    <StrictMode>
      <HeroSection />
    </StrictMode>
  )
}

const initBestsellersSection = async () => {
  const el = document.getElementById('bestsellers-section')
  if (!el) {
    return
  }
  const { BestsellersSection } = await import('./sections/BestsellersSection')
  createRoot(el).render(
    <StrictMode>
      <BestsellersSection />
    </StrictMode>
  )
}

const initFooter = async () => {
  const el = document.getElementById('footer')
  if (!el) {
    return
  }
  const { Footer } = await import('./sections/Footer')
  createRoot(el).render(
    <StrictMode>
      <Footer />
    </StrictMode>
  )
}

intHeader()
initHeroSection()
initBestsellersSection()
initFooter()
