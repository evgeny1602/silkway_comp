import headerLogoImg from './assets/header_logo.png'
import catalogIconImg from './assets/catalog_icon.svg'
import searchIconImg from './assets/search_icon.svg'
import loginIconImg from './assets/login_icon.svg'
import cartIconImg from './assets/cart_icon.svg'
import menuIconImg from './assets/menu_icon.svg'
import { itemsCountPostfix, formatMoney} from './utils'
import { useState, useEffect } from 'react'
import { useDebounce } from './hooks/useDebounce'

export function HeaderLogo({ storeName }) {

  return (
    <a href="/">
      <img
        className="min-w-[85px] h-[40px] header-4:w-[220px] header-4:h-[104px]"
        src={headerLogoImg}
        loading="lazy"
        alt={storeName}
      />
    </a>    
  )
}

export function TopMenuItem({ item }) {
  const { url, text } = item

  return (
    <li>
      <a
        href={url}
        className="hover:text-silkway-orange transition-all duration-200"
      >        
        {text}
      </a>
    </li>
  )
}

export function TopMenu({ items }) {

  return (
    <ul
      className="hidden header-4:flex gap-x-[30px] font-sans text-white text-sm items-start"
    >
      {items.map(
        item => <TopMenuItem key={item.url} item={item} />
      )}
    </ul>
  )
}

export function CatalogButton({ url }) {

  return (
    <a
      href={url}
      className="h-[36px] header-4:w-[190px] header-4:h-[48px] text-sm header-4:text-base font-medium hidden header-4:flex items-center gap-[6px] header-4:gap-[12px] p-[6px] header-4:p-[12px] text-silkway-dark-chocolate bg-silkway-dark-orange rounded shadow-inner shadow-white/45 border border-silkway-dark-orange hover:bg-silkway-orange hover:border-silkway-orange transition-all duration-200"
    >
      <img
        src={catalogIconImg}
        alt="Каталог товаров"
        className="block w-[21px] h-[21px]"
      />
        Каталог товаров
    </a>
  )
}

export function SearchFormWrapper({ children }) {

  return (
    <div
      className="has-[:focus]:bg-white/5 h-[36px] header-4:h-[48px] hidden header-8:flex items-center p-[2px] pr-[3px] header-4:p-[4px] gap-[5px] border rounded border-white/45 transition-all duration-200 w-[300px] header-3:w-[484px] header-7:w-[380px] relative"
    >
      {children}
    </div>
  )
}

export function SearchFormIcon() {

  return (
    <img
      src={searchIconImg}
      className="hidden box-content header-5:block w-[22px] h-[22px] pl-[4px] pr-[4px] header-4:pl-[8px] header-4:pr-[6px]"
    />
  )
}

export function SearchFormButton() {

  return (
    <button
      className="bg-white/20 h-[30px] header-4:h-[38px] text-base text-white hover:bg-white/30 transiotion-all duration-200 px-[8px] header-5:px-[33px] rounded font-sans"
    >
      <SearchFormIconRight />
      <span
        className="hidden header-5:inline"
      >
        Найти
      </span>
    </button>
  )
}

export function SearchFormIconRight() {

  return (
    <img
      src={searchIconImg}
      className="box-content block header-5:hidden w-[22px] h-[22px] pl-[4px] pr-[4px] header-4:pl-[8px] header-4:pr-[6px]"
    />
  )
}

export function SearchFormInput({value, onChange}) {

  return (
    <input
      className="focus:bg-transparent px-[4px] header-5:p-0 outline-none font-sans h-[30px] header-4:h-[38px] text-base bg-silkway-green text-white transition-all duration-200 w-full"
      value={value}
      onChange={onChange}
    />
  )
}

export function SearchFormResults({ results }) {
  if (results.length == 0) return null

  return (
    <div
      className="bg-white rounded shadow-md p-[15px] z-10 absolute left-0 top-[55px]"
    >
      {JSON.stringify(results)}
    </div>
  )
}

export function SearchForm({ searchUrl, autocompleteUrl }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const debouncedQuery = useDebounce(query, 500)

  useEffect(() => {
    const autocomplete = async q => {
      if (q == '') return

      const body = new FormData()
      body.append('SEARCH_QUERY', q)

      const resp = await fetch(autocompleteUrl, {
        method: 'POST',
        body
      })
      const data = await resp.json()
      setResults(data.items)
    }

    autocomplete(debouncedQuery)
  }, [debouncedQuery])

  return (
    <SearchFormWrapper>      
      <SearchFormIcon />

      <SearchFormInput
        value={query}
        onChange={e => {setQuery(e.target.value)}}
      />

      <SearchFormResults results={results} />

      <SearchFormButton />
    </SearchFormWrapper>
  )
}

export function CitySelectWrapper({ children }) {

  return (
    <div
      className="h-[20px] flex gap-[10px]"
    >
      {children}
    </div>
  )
}

export function CitySelectCurrent({ city }) {

  return (
    <span className="font-sans text-sm font-semibold text-white">
      Мой город: {city}
    </span>
  )
}

export function CitySelectButton() {

  return (
    <button
      className="font-sans text-xs text-white w-[77px] h-[20px] rounded bg-white/20 hover:bg-white/30 transition-all duration-200"
    >
      Изменить
    </button>
  )
}

export function CitySelect({ initVal }) {

  return (
    <CitySelectWrapper>
      <CitySelectCurrent city={initVal} />
      <CitySelectButton />
    </CitySelectWrapper>
  )
}

export function HeaderPhone({ phone }) {

  return (
    <a
      href={`tel:${phone}`}
      className="font-sans text-2xl text-white"
    >
      {phone}
    </a>
  )
}

export function LoginAccountButton({ text, url }) {

  return (
    <a
      href={url}
      className="w-[40px] header-4:w-[107px] h-[40px] header-4:h-[84px] font-sans text-base text-white hover:bg-white/10 transition-all duration-200 flex flex-col items-center justify-center rounded border border-white header-4:border-white/45"
    >
      <img
        src={loginIconImg}
        alt={text}
        className="box-content block h-[20px] w-[21px] header-4:h-[26px] header-4:w-[28px]"
      />
      <span
        className="hidden header-4:inline"
      >
        {text}
      </span>
    </a>
  )
}

export function CartButtonWrapper({ children }) {

  return (
    <button
      className="bg-silkway-orange hover:bg-silkway-light-orange transition-all duration-200 text-silkway-dark-chocolate rounded px-[8px] header-4:px-[15px] py-[5px] header-4:py-[10px] items-center text-xs header-4:text-sm shadow-inner shadow-white/45 border border-silkway-dark-orange whitespace-nowrap flex flex-nowrap order-first header-4:order-2 h-[40px] header-4:h-[84px] leading-[1.2]"
    >
      {children}
    </button>
  )
}

export function CartIcon() {

  return (
    <img
        src={cartIconImg}
        className="w-[20px] h-[25px] header-4:w-[27px] header-4:h-[34px] box-content block py-[0px] header-2:py-[10px] header-2:pl-[4px] pl-[0px] header-2:mr-[10px] pr-[8px] header-2:pr-[15px] header-2:border-r-[1px] border-silkway-dark-orange"
      />
  )
}

export function CartTitle() {

  return (
    <>
      <span className="hidden header-2:inline">
        Моя корзина
      </span>
      <span className="header-2:hidden inline">
        Корзина
      </span>
    </>
  )
}

export function CartSum({amount}) {

  return (
    <span className="font-semibold">
      {formatMoney(amount)} ₽
    </span>
  )
}

export function CartProductsCount({ productsCount }) {
  const postfixes = ['товар', 'товара', 'товаров']

  return (
    <span className="hidden header-2:inline">
      {productsCount} {itemsCountPostfix(productsCount, postfixes)}
    </span>
  )
}

export function CartButton({ cartItems }) {
  

  const cartSum = cartItems
    .map(item => item.quantity * item.price)
    .reduce((s, x) => s + x, 0)

  return (
    <CartButtonWrapper>
      <CartIcon />
      <div className="text-left">
        <CartTitle />
        <br />
        <CartSum amount={cartSum} />
        <br />
        <CartProductsCount productsCount={cartItems.length} />
      </div>      
    </CartButtonWrapper>
  )
}

export function MenuButton() {

  return (
    <button
      className="w-[40px] h-[40px] rounded border border-white flex header-4:hidden justify-center items-center hover:bg-white/10 transition-all duration-200"
    >
      <img src={menuIconImg} />
    </button>
  )
}

export function HeaderBackground({ children }) {

  return (
    <div className="w-full bg-silkway-green">
      {children}
    </div>
  )
}

export function HeaderContainer({ children }) {

  return (
    <div
      className="max-w-[1670px] h-[80px] header-4:h-[206px] m-auto flex flex-nowrap items-center justify-start gap-[5px] header-9:gap-[30px] p-[10px] header-4:p-[50px] px-[10px] header-9:px-[20px] header-5:px-[50px]"
    >
      {children}
    </div>
  )
}

export function HeaderCenterSection({ children }) {

  return (
    <div
      className="flex flex-nowrap flex-col justify-center header-4:justify-between gap-[14px] h-full header-4:h-[82px] ml-auto header-4:ml-0"
    >
      {children}
    </div>
  )
}

export function HeaderCenterSubSection({ children }) {

  return (
    <div
      className="flex flex-nowrap gap-[14px] ml-auto header-4:ml-0"
    >
      {children}
    </div>
  )
}

export function HeaderRightSection({ children }) {

  return (
    <div
      className="flex-col h-[80px] justify-between ml-auto hidden header-1:flex"
    >
      {children}
    </div>
  )
}

export function HeaderRightButtonsSection({ children }) {

  return (
    <div
      className="flex flex-nowrap gap-[10px] ml-auto header-1:ml-0"
    >
      {children}
    </div>
  )
}

export function Header() {
    const {
      firstName,
      storeName,
      cartItems,
      phone,
      topMenuItems,
      catalogUrl,
      searchCityAutocompleteUrl,
      setCityUrl,
      searchProductAutocompleteUrl,
      searchProductUrl,
      accountUrl,
      loginUrl,
      isLoggedIn
    } = window.headerData

    return (
      <HeaderBackground>
        <HeaderContainer>
          <HeaderLogo storeName={storeName} />

          <HeaderCenterSection>
            <TopMenu items={topMenuItems} />

            <HeaderCenterSubSection>
              <CatalogButton url={catalogUrl} />

              <SearchForm 
                searchUrl={searchProductUrl}
                autocompleteUrl={searchProductAutocompleteUrl}
              />
            </HeaderCenterSubSection>
          </HeaderCenterSection>

          <HeaderRightSection>
            <CitySelect initVal="Рубцовск" />

            <HeaderPhone phone={phone} />
          </HeaderRightSection>

          <HeaderRightButtonsSection>
            <LoginAccountButton
              url={isLoggedIn ? accountUrl : loginUrl}
              text={isLoggedIn ? firstName : 'Войти'}
            />

            <CartButton cartItems={cartItems} />

            <MenuButton />
          </HeaderRightButtonsSection>          
        </HeaderContainer>
      </HeaderBackground>
    )
}