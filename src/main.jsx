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

const intBreadcrumbs = async () => {
  const el = document.getElementById('breadcrumbs-section')
  if (!el) {
    return
  }
  const { Breadcrumbs } = await import('./sections/Breadcrumbs')
  createRoot(el).render(
    <StrictMode>
      <Breadcrumbs />
    </StrictMode>
  )
}

const intSidebar = async () => {
  const el = document.getElementById('sidebar')
  if (!el) {
    return
  }
  const { Sidebar } = await import('./sections/Sidebar')
  createRoot(el).render(
    <StrictMode>
      <Sidebar />
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

const initRestsaleSection = async () => {
  const el = document.getElementById('rest-sale-section')
  if (!el) {
    return
  }
  const { RestsaleSection } = await import('./sections/RestsaleSection')
  createRoot(el).render(
    <StrictMode>
      <RestsaleSection />
    </StrictMode>
  )
}

const initFavoritesViewedSection = async () => {
  const el = document.getElementById('favorite-viewed-section')
  if (!el) {
    return
  }
  const { FavoritesViewedSection } = await import(
    './sections/FavoritesViewedSection'
  )
  createRoot(el).render(
    <StrictMode>
      <FavoritesViewedSection />
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

const initSearchResults = async () => {
  const el = document.getElementById('search-results')
  if (!el) {
    return
  }
  const { SearchResultsSection } = await import(
    './sections/SearchResultsSection'
  )
  createRoot(el).render(
    <StrictMode>
      <SearchResultsSection />
    </StrictMode>
  )
}

const initCategoryItems = async () => {
  const el = document.getElementById('category-items')
  if (!el) {
    return
  }
  const { CatalogItems } = await import('./sections/CatalogItems')
  createRoot(el).render(
    <StrictMode>
      <CatalogItems />
    </StrictMode>
  )
}

const initCatalogItems = async () => {
  const el = document.getElementById('catalog-items')
  if (!el) {
    return
  }
  const { CatalogItems } = await import('./sections/CatalogItems')
  createRoot(el).render(
    <StrictMode>
      <CatalogItems />
    </StrictMode>
  )
}

const initCategoryTitle = async () => {
  const el = document.getElementById('category-title')
  if (!el) {
    return
  }
  const { CategoryTitle } = await import('./sections/CategoryTitle')
  createRoot(el).render(
    <StrictMode>
      <CategoryTitle />
    </StrictMode>
  )
}

intHeader()
intBreadcrumbs()
intSidebar()
initHeroSection()
initBestsellersSection()
initRestsaleSection()
initFavoritesViewedSection()
initFooter()
initSearchResults()
initCategoryItems()
initCatalogItems()
initCategoryTitle()
