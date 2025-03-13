import { SectionContainer } from '../ui/SectionContainer'
import { SectionInnerContainer } from '../ui/SectionInnerContainer'

import truckIcon from '../assets/truck_icon.svg'
import chatIcon from '../assets/chat_icon.svg'
import giftIcon from '../assets/gift_icon.svg'
import piggyIcon from '../assets/piggy_icon.svg'
import smileIcon from '../assets/smile_icon.svg'

function FeatureTitle({ children }) {
  return (
    <div className="font-bold text-xl max-[590px]:text-base">{children}</div>
  )
}

function OtherFeatureTitle({ children }) {
  return (
    <div className="font-bold text-base max-[590px]:text-xs">{children}</div>
  )
}

function FeatureText({ children }) {
  return <div className="text-sm max-[590px]:text-xs">{children}</div>
}

function FeatureTitleTextContainer({ children }) {
  return (
    <div className="flex flex-nowrap flex-col justify-start gap-[15px] max-[590px]:gap-[10px] font-sans text-silkway-dark-chocolate">
      {children}
    </div>
  )
}

function DeliveryFeature() {
  return (
    <div className="flex flex-nowrap flex-row justify-start items-center gap-[15px] max-[590px]:gap-[10px] w-full min-w-[380px] max-[590px]:min-w-[280px] max-w-[461px] p-[30px] max-[590px]:p-[15px]">
      <img
        src={truckIcon}
        className="h-[90px] max-[590px]:h-[60px] aspect-square"
      />
      <FeatureTitleTextContainer>
        <FeatureTitle>Стоимость доставки:</FeatureTitle>
        <FeatureText>
          Стоимость доставки зависит от веса и габаритов отправления, а также от
          тарифов службы доставки. Точную стоимость доставки вам объявит
          менеджер после оформления заказа.
        </FeatureText>
      </FeatureTitleTextContainer>
    </div>
  )
}

function OtherFeatureContainer({ children }) {
  return (
    <div className="flex flex-nowrap flex-row justify-start gap-[10px] min-w-[235px] max-w-[245px]">
      {children}
    </div>
  )
}

function OtherTitleTextContainer({ children }) {
  return (
    <div className="flex flex-nowrap flex-col justify-start min-w-[176px]">
      {children}
    </div>
  )
}

function OtherFeature({ icon, children }) {
  return (
    <OtherFeatureContainer>
      <img
        src={icon}
        className="h-[60px] aspect-square"
      />

      <OtherTitleTextContainer>{children}</OtherTitleTextContainer>
    </OtherFeatureContainer>
  )
}

function SupportFeature() {
  return (
    <OtherFeature icon={chatIcon}>
      <OtherFeatureTitle>Онлайн поддержка</OtherFeatureTitle>
      <FeatureText>Время работы: 8:30 - 18:00</FeatureText>
    </OtherFeature>
  )
}

function MoneybackFeature() {
  return (
    <OtherFeature icon={piggyIcon}>
      <OtherFeatureTitle>Возвращаем деньги</OtherFeatureTitle>
      <FeatureText>Если товар имеет брак</FeatureText>
    </OtherFeature>
  )
}

function WholesalerFeature() {
  return (
    <OtherFeature icon={giftIcon}>
      <OtherFeatureTitle>Оптовикам дешевле</OtherFeatureTitle>
      <FeatureText>Свяжитесь с менеждером</FeatureText>
    </OtherFeature>
  )
}

function SecondorderFeature() {
  return (
    <OtherFeature icon={smileIcon}>
      <OtherFeatureTitle>99% клиентов делают</OtherFeatureTitle>
      <FeatureText>Второй заказ</FeatureText>
    </OtherFeature>
  )
}

function FeaturesBanner() {
  return (
    <div className="bg-white flex flex-nowrap max-[1100px]:flex-wrap flex-row justify-start items-start border border-silkway-gray max-w-[68%] max-[590px]:max-w-[98%]">
      <DeliveryFeature />

      <div className="flex flex-row flex-wrap justify-start  gap-[30px] max-[590px]:gap-[15px] border-l max-[1100px]:border-t max-[1100px]:border-l-0 border-silkway-gray p-[30px] max-[590px]:p-[15px]">
        <SupportFeature />
        <MoneybackFeature />
        <WholesalerFeature />
        <SecondorderFeature />
      </div>
    </div>
  )
}

export function FeaturesSection() {
  return (
    <SectionContainer variant="milk">
      <SectionInnerContainer className="py-[50px] flex flex-nowrap justify-center">
        <FeaturesBanner />
      </SectionInnerContainer>
    </SectionContainer>
  )
}
