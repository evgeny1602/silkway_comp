import headerLogoImg from './assets/header_logo.png'
import catalogIconImg from './assets/catalog_icon.svg'
import searchIconImg from './assets/search_icon.svg'
import loginIconImg from './assets/login_icon.svg'
import cartIconImg from './assets/cart_icon.svg'
import menuIconImg from './assets/menu_icon.svg'
import crossIconImg from './assets/cross_icon.svg'
import dollyIconImg from './assets/dolly_icon.svg'
import walletIconImg from './assets/wallet_icon.svg'
import trashIconImg from './assets/trash_icon.svg'
import {
  itemsCountPostfix,
  formatMoney,
  getLobalData,
  searchProduct,
  disableDocumentScroll,
  enableDocumentScroll,
  cartSum,
} from './utils'
import { useRef, useState } from 'react'
import { Button } from './Button'
import { SearchAutocomplete } from './SearchAutocomplete'
import { autocomplete as cityAutocomplete } from './api/city'
import { set as citySet } from './api/city'
import { autocomplete as productAutocomplete } from './api/product'
import { searchProductRedirectUrl, imagesUrlPrefix } from './config'
import { ModalOverlay } from './ModalOverlay'
import { useFetch } from './hooks/useFetch'
import { useOutsideClick } from './hooks/useOutsideClick'

function HeaderLogo() {
  return (
    <a href="/">
      <img
        className="min-w-[85px] h-[40px] header-4:w-[220px] header-4:h-[104px]"
        src={headerLogoImg}
        loading="lazy"
        alt="Шёлковый путь"
      />
    </a>
  )
}

function TopMenuItem({ item }) {
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

function TopMenu({ items }) {
  return (
    <ul className="hidden header-4:flex gap-x-[30px] font-sans text-white text-sm items-start">
      {items.map((item) => (
        <TopMenuItem
          key={item.url}
          item={item}
        />
      ))}
    </ul>
  )
}

function CatalogButton({ url }) {
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

function SearchFormWrapper({ children }) {
  return (
    <div className="has-[:focus]:bg-white/5 h-[36px] header-4:h-[48px] hidden header-8:flex items-center p-[2px] pr-[3px] header-4:p-[4px] gap-[5px] border rounded border-white/45 transition-all duration-200 w-[300px] header-3:w-[484px] header-7:w-[380px] relative">
      {children}
    </div>
  )
}

function SearchFormIcon() {
  return (
    <img
      src={searchIconImg}
      className="hidden box-content header-5:block w-[22px] h-[22px] pl-[4px] pr-[4px] header-4:pl-[8px] header-4:pr-[6px]"
    />
  )
}

function SearchFormButton({ onClick }) {
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

function SearchFormIconRight() {
  return (
    <img
      src={searchIconImg}
      className="box-content block header-5:hidden w-[22px] h-[22px] pl-[4px] pr-[4px] header-4:pl-[8px] header-4:pr-[6px]"
    />
  )
}

function SearchForm() {
  return (
    <SearchFormWrapper>
      <SearchFormIcon />
      <ProductSearchAutocomplete />
    </SearchFormWrapper>
  )
}

function CitySelectWrapper({ children }) {
  return <div className="h-[20px] flex gap-[10px]">{children}</div>
}

function CitySelectCurrent({ city }) {
  return (
    <span className="font-sans text-sm font-semibold text-white">
      Мой город: {city}
    </span>
  )
}

function CitySelectButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="font-sans text-xs text-white w-[77px] h-[20px] rounded bg-white/20 hover:bg-white/30 transition-all duration-200"
    >
      Изменить
    </button>
  )
}

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

function ModalContainer({ children }) {
  return (
    <div className="p-6 bg-white rounded shadow-md h-[200px] w-[90vw] max-w-[400px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60]">
      {children}
    </div>
  )
}

function ModalContentContainer({ children }) {
  return (
    <div className="flex flex-col justify-between h-full -mt-5 relative">
      {children}
    </div>
  )
}

function ModalHeader({ children }) {
  return (
    <h3 className="font-sans font-semibold text-xl text-center">{children}</h3>
  )
}

function ModalButtonsContainer({ children }) {
  return (
    <div className="flex flex-nowrap justify-center gap-[25px]">{children}</div>
  )
}

function ProductSearchAutocomplete() {
  const [query, setQuery] = useState('')

  const handleItemClick = (e) => {
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
        onChange={(e) => setQuery(e.target.value)}
      />

      <SearchFormButton onClick={handleEnter} />
    </>
  )
}

function CitySearchAutocomplete({ onChange, onItemClick }) {
  return (
    <SearchAutocomplete
      fetcher={cityAutocomplete}
      inputClassname="border-silkway-light-gray border-[1px] rounded focus:outline-none px-2 py-1 w-full"
      dropdownClassname="w-full top-[100px] h-max-[150px] bg-white overflow-y-auto rounded shadow-md p-2 z-10 absolute flex flex-col flex-nowrap"
      dropdownItemClassname="cursor-pointer px-2 py-1 w-full rounded hover:bg-silkway-orange hover:text-white"
      onChange={onChange}
      onItemClick={onItemClick}
    />
  )
}

function CitySelectModal({ onCloseClick, onSubmit }) {
  const [cityId, setCityId] = useState(null)
  const [cityName, setCityName] = useState(null)

  const handleItemClick = (e) => {
    setCityId(e.target.dataset.cityId)
    setCityName(e.target.dataset.city)
  }

  return (
    <>
      <ModalContainer>
        <CloseModalButton onClick={onCloseClick} />

        <ModalContentContainer>
          <ModalHeader>Ваш город</ModalHeader>

          <CitySearchAutocomplete onItemClick={handleItemClick} />

          <ModalButtonsContainer>
            <Button
              variant="ghost"
              onClick={onCloseClick}
            >
              Отменить
            </Button>
            <Button
              variant="primary"
              onClick={() => onSubmit(cityId, cityName)}
            >
              Сохранить
            </Button>
          </ModalButtonsContainer>
        </ModalContentContainer>
      </ModalContainer>
      <ModalOverlay />
    </>
  )
}

function CitySelect({ initCityName }) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [cityId, setCityId] = useState(null)
  const [cityName, setCityName] = useState(initCityName)

  const { results } = useFetch(citySet, cityId)

  const showModal = () => {
    setIsModalVisible(true)
    disableDocumentScroll()
  }

  const hideModal = () => {
    setIsModalVisible(false)
    enableDocumentScroll()
  }

  const handleCitySubmit = (submittedCityId, submittedCityName) => {
    setCityId(submittedCityId)
    setCityName(submittedCityName)
    hideModal()
  }

  return (
    <CitySelectWrapper>
      <CitySelectCurrent city={cityName} />

      <CitySelectButton onClick={showModal} />

      {isModalVisible && (
        <CitySelectModal
          onCloseClick={hideModal}
          onSubmit={handleCitySubmit}
        />
      )}
    </CitySelectWrapper>
  )
}

function HeaderPhone({ phone }) {
  return (
    <a
      href={`tel:${phone}`}
      className="font-sans text-2xl text-white"
    >
      {phone}
    </a>
  )
}

function LoginAccountButton({ text, url }) {
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
      <span className="hidden header-4:inline">{text}</span>
    </a>
  )
}

function CartButtonWrapper({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-silkway-orange hover:bg-silkway-light-orange transition-all duration-200 text-silkway-dark-chocolate rounded px-[8px] header-4:px-[15px] py-[5px] header-4:py-[10px] items-center text-xs header-4:text-sm shadow-inner shadow-white/45 border border-silkway-dark-orange whitespace-nowrap flex flex-nowrap h-[40px] header-4:h-[84px] leading-[1.2]"
    >
      {children}
    </button>
  )
}

function CartIcon() {
  return (
    <div className="flex flex-col justify-center box-content h-full w-full mr-[10px] border-0 header-2:border-r-[1px] header-2:border-silkway-dark-orange header-2:pr-[12px]">
      <img
        src={cartIconImg}
        className="w-[20px] h-[25px] header-4:w-[27px] header-4:h-[34px] box-content block"
      />
    </div>
  )
}

function CartTitle() {
  return (
    <>
      <span className="hidden header-2:inline">Моя корзина</span>
      <span className="header-2:hidden inline">Корзина</span>
    </>
  )
}

function CartSum({ amount }) {
  return <span className="font-semibold">{formatMoney(amount)} ₽</span>
}

function ItemsCountLabel({ itemsCount, postfixVariants }) {
  const postfix = itemsCountPostfix(itemsCount, postfixVariants)

  return (
    <span className="hidden header-2:inline">
      {itemsCount} {postfix}
    </span>
  )
}

function CartButton({ cartItems, onClick }) {
  const postfixVariants = ['товар', 'товара', 'товаров']

  return (
    <CartButtonWrapper onClick={onClick}>
      <CartIcon />
      <div className="text-left flex flex-col">
        <CartTitle />

        <CartSum amount={cartSum(cartItems)} />

        <ItemsCountLabel
          itemsCount={cartItems.length}
          postfixVariants={postfixVariants}
        />
      </div>
    </CartButtonWrapper>
  )
}

function MenuButton() {
  return (
    <button className="w-[40px] h-[40px] rounded border border-white flex header-4:hidden justify-center items-center hover:bg-white/10 transition-all duration-200">
      <img src={menuIconImg} />
    </button>
  )
}

function HeaderBackground({ children }) {
  return <div className="w-full bg-silkway-green">{children}</div>
}

function HeaderContainer({ children }) {
  return (
    <div className="max-w-[1670px] h-[80px] header-4:h-[206px] m-auto flex flex-nowrap items-center justify-start gap-[5px] header-9:gap-[30px] p-[10px] header-4:p-[50px] px-[10px] header-9:px-[20px] header-5:px-[50px]">
      {children}
    </div>
  )
}

function HeaderCenterSection({ children }) {
  return (
    <div className="flex flex-nowrap flex-col justify-center header-4:justify-between gap-[14px] h-full header-4:h-[82px] ml-auto header-4:ml-0">
      {children}
    </div>
  )
}

function HeaderCenterSubSection({ children }) {
  return (
    <div className="flex flex-nowrap gap-[14px] ml-auto header-4:ml-0">
      {children}
    </div>
  )
}

function HeaderRightSection({ children }) {
  return (
    <div className="flex-col h-[80px] justify-between ml-auto hidden header-1:flex">
      {children}
    </div>
  )
}

function HeaderRightButtonsSection({ children }) {
  return (
    <div className="flex flex-nowrap gap-[10px] ml-auto header-1:ml-0">
      {children}
    </div>
  )
}

function ToCartButton({ onClick }) {
  return (
    <Button
      onClick={onClick}
      variant="primary"
      paddingX={`px-[15px]`}
      className={`ml-auto mr-[15px]`}
    >
      <img src={dollyIconImg} />
      <span className="max-[540px]:hidden inline ml-[8px]">В КОРЗИНУ</span>
    </Button>
  )
}

function CheckoutButton({ onClick }) {
  return (
    <Button
      variant="primary-dark"
      onClick={onClick}
    >
      <img src={walletIconImg} />
      <span className="max-[540px]:hidden inline ml-[8px]">ОФОРМИТЬ</span>
    </Button>
  )
}

function CartDropdownTotal({ cartItems }) {
  return (
    <div className="font-sans text-silkway-dark-chocolate">
      <div className="text-sm">Итого:</div>
      <div className="text-xl font-semibold">
        {formatMoney(cartSum(cartItems))} ₽
      </div>
    </div>
  )
}

function CartDropdownFooterContainer({ children }) {
  return (
    <div className="p-[15px] border-t h-[78px] flex flex-nowrap">
      {children}
    </div>
  )
}

function CartDropdownHeaderContainer({ children }) {
  return (
    <div className="border-b border-silkway-light-gray pb-[15px] h-[50px] px-[15px]">
      {children}
    </div>
  )
}

function CartDropdownTopContainer({ children }) {
  return <div className="pt-[15px]">{children}</div>
}

function CartDropdownClearCartButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="font-sans font-medium text-sm text-silkway-gray underline cursor-pointer hover:text-silkway-light-chocolate"
    >
      Очистить всю корзину
    </button>
  )
}

function CartDropdownContainer({ children, dropdownRef }) {
  return (
    <div
      ref={dropdownRef}
      className="max-[650px]:fixed max-[650px]:top-0 max-[650px]:mt-[65px] mx-auto max-[650px]:max-h-[300px] max-[650px]:translate-y-0 max-[650px]:left-0 max-h-[400px] right-0 bottom-0 -mb-1 translate-y-[100%] max-w-[500px] w-[90vw] min-h-[200px] absolute bg-white rounded shadow-md flex flex-nowrap flex-col justify-between"
    >
      {children}
    </div>
  )
}

function CartItemContainer({ children }) {
  return (
    <div className="border-b border-silkway-light-gray/30 px-[15px] py-[10px] flex flex-nowrap gap-[10px] text-silkway-dark-chocolate cursor-pointer hover:bg-silkway-dark-milk">
      {children}
    </div>
  )
}

function CartItemImg({ src, name }) {
  return (
    <img
      alt={name}
      className="w-[80px] h-[80px] aspect-auto object-cover rounded"
      src={`${imagesUrlPrefix}${src}`}
    />
  )
}

function CartItemHeaderContainer({ children }) {
  return <div className="text-sm font-normal">{children}</div>
}

function CartItemInfoContainer({ children }) {
  return <div className="flex flex-nowrap flex-col">{children}</div>
}

function CartItemProperties({ properties }) {
  return (
    <div className="mt-auto">
      {properties.map((item) => (
        <div
          className="text-xs"
          key={item.id}
        >
          <span className="font-light">{item.name}: </span>
          <span className="font-normal underline decoration-1 decoration-silkway-dark-chocolate/50">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  )
}

function CartItemRightContainer({ children }) {
  return (
    <div className="ml-auto flex flex-nowrap justify-between gap-[25px] items-center pr-2">
      {children}
    </div>
  )
}

function CartItem({ item }) {
  const excludeCodes = ['CML2_ATTRIBUTES', 'CML2_BAR_CODE']

  const properties = Object.values(item.properties)
    .filter((item) => item.value_id)
    .filter((item) => !excludeCodes.includes(item.code))

  return (
    <CartItemContainer>
      <CartItemImg
        src={item.picture}
        name={item.name}
      />

      <CartItemInfoContainer>
        <CartItemHeaderContainer>{item.name}</CartItemHeaderContainer>
        <CartItemProperties properties={properties} />
      </CartItemInfoContainer>

      <CartItemRightContainer>
        <div className="text-base font-normal text-silkway-orange">
          x{item.quantity}
        </div>

        <div className="text-base font-normal text-silkway-dark-chocolate">
          {formatMoney(item.price * item.quantity)} ₽
        </div>

        <button className="hover:bg-silkway-light-orange/40 p-[8px] rounded transition-all">
          <img src={trashIconImg} />
        </button>
      </CartItemRightContainer>
    </CartItemContainer>
  )
}

function CartDropdownItemsContainer({ cartItems }) {
  return (
    <div className="pt-[8px] h-[250px] overflow-y-auto">
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
        />
      ))}
    </div>
  )
}

function CartItemsDropdown({ cartItems, dropdownRef }) {
  const handleClearCartClick = () => {
    console.log('Clear cart')
  }

  const handleCheckoutClick = () => {
    console.log('Checkout')
  }

  const handleToCartClick = () => {
    console.log('To cart')
  }

  return (
    <CartDropdownContainer dropdownRef={dropdownRef}>
      <CartDropdownTopContainer>
        <CartDropdownHeaderContainer>
          <CartDropdownClearCartButton onClick={handleClearCartClick} />
        </CartDropdownHeaderContainer>
        <CartDropdownItemsContainer cartItems={cartItems} />
      </CartDropdownTopContainer>
      <CartDropdownFooterContainer>
        <CartDropdownTotal cartItems={cartItems} />
        <ToCartButton onClick={handleToCartClick} />
        <CheckoutButton onClick={handleCheckoutClick} />
      </CartDropdownFooterContainer>
    </CartDropdownContainer>
  )
}

function CartWithDropdown({ cartItems }) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)

  const dropdownRef = useRef(null)

  useOutsideClick(dropdownRef, () => setIsDropdownVisible(false))

  return (
    <div className="relative order-first header-4:order-2">
      <CartButton
        cartItems={cartItems}
        onClick={() => setIsDropdownVisible((prev) => !prev)}
      />

      {isDropdownVisible && (
        <CartItemsDropdown
          dropdownRef={dropdownRef}
          cartItems={cartItems}
        />
      )}
    </div>
  )
}

export function Header() {
  const {
    firstName,
    cartItems,
    phone,
    topMenuItems,
    catalogUrl,
    accountUrl,
    loginUrl,
    isLoggedIn,
    cityName,
  } = getLobalData('headerData')

  const loginButtonUrl = isLoggedIn ? accountUrl : loginUrl
  const loginButtonText = isLoggedIn ? firstName : 'Войти'

  return (
    <HeaderBackground>
      <HeaderContainer>
        <HeaderLogo />

        <HeaderCenterSection>
          <TopMenu items={topMenuItems} />

          <HeaderCenterSubSection>
            <CatalogButton url={catalogUrl} />
            <SearchForm />
          </HeaderCenterSubSection>
        </HeaderCenterSection>

        <HeaderRightSection>
          <CitySelect initCityName={cityName} />

          <HeaderPhone phone={phone} />
        </HeaderRightSection>

        <HeaderRightButtonsSection>
          <LoginAccountButton
            url={loginButtonUrl}
            text={loginButtonText}
          />

          <CartWithDropdown cartItems={cartItems} />

          <MenuButton />
        </HeaderRightButtonsSection>
      </HeaderContainer>
    </HeaderBackground>
  )
}
