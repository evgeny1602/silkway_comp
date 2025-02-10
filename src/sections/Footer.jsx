import footerLogoImg from '@/assets/logo.png'
import { getGlobalData } from '@/utils'
import { SectionContainer } from '@/ui/SectionContainer'
import { SectionInnerContainer } from '../ui/SectionInnerContainer'

function FooterHeading({ children }) {
  return (
    <h3 className="text-xl footer-1.7:text-2xl font-bold pb-3 text-center footer-1:text-left">
      {children}
    </h3>
  )
}

function FooterLogo() {
  const { storeName, storeDescription } = getGlobalData('footerData')

  return (
    <div className="flex flex-col justify-self-center footer-1:justify-self-auto gap-y-[20px] w-[236px] h-[272px] bg-silkway-green rounded-l-[4px] pt-[20px] pb-[30px] px-[10px] text-sm text-white text-right font-sans order-last footer-2:order-first">
      <img
        src={footerLogoImg}
        loading="lazy"
        alt={storeName}
      />

      <p>
        {storeDescription}
        <br />“{storeName}”
      </p>

      <p className="mt-auto">{new Date().getFullYear()}</p>
    </div>
  )
}

function FooterMenuSectionItem({ item }) {
  return (
    <li className="mb-1 text-center footer-1:text-left">
      <a
        className="text-xs footer-1.7:text-sm hover:text-silkway-gray transition-all duration-200"
        href={item.url}
      >
        {item.text}
      </a>
    </li>
  )
}

function FooterMenuSection({ section }) {
  return (
    <div>
      <FooterHeading>{section.title}</FooterHeading>

      <ul>
        {section.items.map((item) => (
          <FooterMenuSectionItem
            key={item.url + item.text}
            item={item}
          />
        ))}
      </ul>
    </div>
  )
}

function FooterContacts() {
  const { address, phone, email } = getGlobalData('footerData')

  return (
    <div>
      <FooterHeading>Контакты</FooterHeading>

      <p className="text-xs footer-1.7:text-sm leading-8 text-center footer-1:text-left">
        {address[0]}
        <br />
        {address[1]}
        <br />
        <br />
        <a href={`mailto:${email}`}>{email}</a>
        <br />
        <span className="text-xl footer-1.7:text-2xl">
          <a href={`tel:${phone}`}>{phone}</a>
        </span>
        <br />
        Единый телефон поддержки клиентов
      </p>
    </div>
  )
}

export function Footer() {
  const { menuSections } = getGlobalData('footerData')

  return (
    <SectionContainer>
      <SectionInnerContainer>
        <div className="grid grid-cols-1 footer-1:grid-cols-2 footer-1.8:flex flex-wrap justify-between gap-[50px]   text-silkway-dark-chocolate font-sans py-[50px]">
          <FooterLogo />

          {menuSections.map((s) => (
            <FooterMenuSection
              key={s.title}
              section={s}
            />
          ))}

          <FooterContacts />
        </div>
      </SectionInnerContainer>
    </SectionContainer>
  )
}
