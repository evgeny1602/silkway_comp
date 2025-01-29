import headerLogoImg from './assets/header_logo.png'
import catalogIconImg from './assets/catalog_icon.svg'
import searchIconImg from './assets/search_icon.svg'
import loginIconImg from './assets/login_icon.svg'
import cartIconImg from './assets/cart_icon.svg'
import menuIconImg from './assets/menu_icon.svg'
import crossIconImg from './assets/cross_icon.svg'
import { itemsCountPostfix, formatMoney} from './utils'
import { useState, useRef } from 'react'
import { getLobalData } from './utils'
import { Button } from './Button'
import { SearchAutocomplete } from './SearchAutocomplete'
import { autocomplete as cityAutocomplete } from "./api/city"
import { autocomplete as productAutocomplete } from './api/product'
import { searchProductRedirectUrl } from './config'
import { searchProduct } from './utils'
import { ModalOverlay } from './ModalOverlay'

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

  return (
    <li>
      <a
        href={item.url}
        className="hover:text-silkway-orange transition-all duration-200"
      >        
        {item.text}
      </a>
    </li>
  )
}

export function TopMenu({ items }) {

  return (
    <ul className="hidden header-4:flex gap-x-[30px] font-sans text-white text-sm items-start">
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
    <div className="has-[:focus]:bg-white/5 h-[36px] header-4:h-[48px] hidden header-8:flex items-center p-[2px] pr-[3px] header-4:p-[4px] gap-[5px] border rounded border-white/45 transition-all duration-200 w-[300px] header-3:w-[484px] header-7:w-[380px] relative">
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

export function SearchFormButton({ onClick }) {

  return (
    <button
      onClick={onClick}
      className="bg-white/20 h-[30px] header-4:h-[38px] text-base text-white hover:bg-white/30 transiotion-all duration-200 px-[8px] header-5:px-[33px] rounded font-sans"
    >
      <SearchFormIconRight />
      <span className="hidden header-5:inline">Найти</span>
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

export function SearchForm() { 

  return (
    <SearchFormWrapper>      
      <SearchFormIcon />
      <ProductSearchAutocomplete />      
    </SearchFormWrapper>
  )
}

export function CitySelectWrapper({ children }) {

  return (
    <div className="h-[20px] flex gap-[10px]">
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

export function CitySelectButton({ onClick }) {

  return (
    <button
      onClick={onClick}
      className="font-sans text-xs text-white w-[77px] h-[20px] rounded bg-white/20 hover:bg-white/30 transition-all duration-200"
    >
      Изменить
    </button>
  )
}

export function CloseModalButton({ onClick }) {

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

export function ModalContainer({ children }) {

  return (
    <div className="p-6 bg-white rounded shadow-md h-[200px] w-[90vw] max-w-[400px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60]">
      {children}
    </div>
  )
}

export function ModalContentContainer({ children }) {

  return (
    <div className="flex flex-col justify-between h-full -mt-5 relative">
      {children}
    </div>
  )
}

export function ModalHeader({ children }) {

  return (
    <h3 className="font-sans font-semibold text-xl text-center">
      {children}
    </h3>
  )
}

export function ModalButtonsContainer({ children }) {

  return (
    <div className="flex flex-nowrap justify-center gap-[25px]">
      {children}
    </div>
  )
}

export function ProductSearchAutocomplete() {
  const [query, setQuery] = useState('')

  const handleItemClick = e => {
    location.href = e.target.dataset.url
  }

  const handleEnter = () => {
    searchProduct(query, searchProductRedirectUrl)
  }

  return (
    <>
      <SearchAutocomplete
        fetcher={productAutocomplete}
        inputClassname="focus:bg-transparent px-[4px] header-5:p-0 outline-none font-sans h-[30px] header-4:h-[38px] text-base bg-silkway-green text-white transition-all duration-200 w-full"
        dropdownClassname="h-[200px] w-full left-0 top-[55px] bg-white overflow-y-auto rounded shadow-md p-2 z-10 absolute flex flex-col flex-nowrap"
        dropdownItemClassname="cursor-pointer px-2 py-1 w-full rounded hover:bg-silkway-orange hover:text-white"
        onItemClick={handleItemClick}
        onEnter={handleEnter}
        onChange={e => setQuery(e.target.value)}
      />
      <SearchFormButton onClick={handleEnter} />
    </>
  )
}

export function CitySearchAutocomplete() {

  return (
    <SearchAutocomplete
      fetcher={cityAutocomplete}
      inputClassname="border-silkway-light-gray border-[1px] rounded focus:outline-none px-2 py-1 w-full"
      dropdownClassname="w-full top-[100px] h-[150px] bg-white overflow-y-auto rounded shadow-md p-2 z-10 absolute flex flex-col flex-nowrap"
      dropdownItemClassname="cursor-pointer px-2 py-1 w-full rounded hover:bg-silkway-orange hover:text-white"
    />
  )
}

export function CitySelectModal({ onCloseClick }) {

  return (
    <>
      <ModalContainer>
        <CloseModalButton onClick={onCloseClick} />

        <ModalContentContainer>
          <ModalHeader>Ваш город</ModalHeader>

          <CitySearchAutocomplete />

          <ModalButtonsContainer>
            <Button variant='ghost' onClick={onCloseClick}>Отменить</Button>
            <Button variant='primary'>Сохранить</Button> 
          </ModalButtonsContainer>                     
        </ModalContentContainer>  
        
      </ModalContainer>
      <ModalOverlay />
    </>
  )   
}

export function CitySelect({ initVal }) {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
    document.body.classList.add("overflow-y-hidden")
  }

  const hideModal = () => {
    setIsModalVisible(false)
    document.body.classList.remove("overflow-y-hidden")
  }

  return (
    <CitySelectWrapper>
      <CitySelectCurrent city={initVal} />

      <CitySelectButton onClick={showModal} />

      {isModalVisible && (
        <CitySelectModal onCloseClick={hideModal} />
      )}
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
      <span className="hidden header-4:inline">
        {text}
      </span>
    </a>
  )
}

export function CartButtonWrapper({ children }) {

  return (
    <button className="bg-silkway-orange hover:bg-silkway-light-orange transition-all duration-200 text-silkway-dark-chocolate rounded px-[8px] header-4:px-[15px] py-[5px] header-4:py-[10px] items-center text-xs header-4:text-sm shadow-inner shadow-white/45 border border-silkway-dark-orange whitespace-nowrap flex flex-nowrap order-first header-4:order-2 h-[40px] header-4:h-[84px] leading-[1.2]">
      {children}
    </button>
  )
}

export function CartIcon() {

  return (
    <div className="flex flex-col justify-center box-content h-full w-full mr-[10px] border-0 header-2:border-r-[1px] header-2:border-silkway-dark-orange header-2:pr-[12px]">
      <img
        src={cartIconImg}
        className="w-[20px] h-[25px] header-4:w-[27px] header-4:h-[34px] box-content block"
      />
    </div>
    
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

export function ItemsCountLabel({ itemsCount, postfixVariants }) {
  const postfix = itemsCountPostfix(itemsCount, postfixVariants)

  return (
    <span className="hidden header-2:inline">
      {itemsCount} {postfix}
    </span>
  )
}

export function CartButton({ cartItems }) {
  const cartSum = cartItems
    .map(item => item.quantity * item.price)
    .reduce((s, x) => s + x, 0)

  const postfixVariants = ['товар', 'товара', 'товаров']

  return (
    <CartButtonWrapper>
      <CartIcon />
      <div className="text-left flex flex-col">
        <CartTitle />

        <CartSum amount={cartSum} />

        <ItemsCountLabel
          itemsCount={cartItems.length}
          postfixVariants={postfixVariants}
        />
      </div>      
    </CartButtonWrapper>
  )
}

export function MenuButton() {

  return (
    <button className="w-[40px] h-[40px] rounded border border-white flex header-4:hidden justify-center items-center hover:bg-white/10 transition-all duration-200">
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
    <div className="max-w-[1670px] h-[80px] header-4:h-[206px] m-auto flex flex-nowrap items-center justify-start gap-[5px] header-9:gap-[30px] p-[10px] header-4:p-[50px] px-[10px] header-9:px-[20px] header-5:px-[50px]">
      {children}
    </div>
  )
}

export function HeaderCenterSection({ children }) {

  return (
    <div className="flex flex-nowrap flex-col justify-center header-4:justify-between gap-[14px] h-full header-4:h-[82px] ml-auto header-4:ml-0">
      {children}
    </div>
  )
}

export function HeaderCenterSubSection({ children }) {

  return (
    <div className="flex flex-nowrap gap-[14px] ml-auto header-4:ml-0">
      {children}
    </div>
  )
}

export function HeaderRightSection({ children }) {

  return (
    <div className="flex-col h-[80px] justify-between ml-auto hidden header-1:flex">
      {children}
    </div>
  )
}

export function HeaderRightButtonsSection({ children }) {

  return (
    <div className="flex flex-nowrap gap-[10px] ml-auto header-1:ml-0">
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
      accountUrl,
      loginUrl,
      isLoggedIn
    } = getLobalData('headerData')

    const loginButtonUrl = isLoggedIn ? accountUrl : loginUrl
    const loginButtonText = isLoggedIn ? firstName : 'Войти'

    return (
      <HeaderBackground>
        <HeaderContainer>
          <HeaderLogo storeName={storeName} />

          <HeaderCenterSection>
            <TopMenu items={topMenuItems} />

            <HeaderCenterSubSection>
              <CatalogButton url={catalogUrl} />
              <SearchForm />
            </HeaderCenterSubSection>
          </HeaderCenterSection>

          <HeaderRightSection>
            <CitySelect initVal="Рубцовск" />

            <HeaderPhone phone={phone} />
          </HeaderRightSection>

          <HeaderRightButtonsSection>
            <LoginAccountButton url={loginButtonUrl} text={loginButtonText} />

            <CartButton cartItems={cartItems} />

            <MenuButton />
          </HeaderRightButtonsSection>          
        </HeaderContainer>
      </HeaderBackground>
    )
}