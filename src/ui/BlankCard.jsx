import { CardContainer } from '@/ui/CardContainer'
import { CardPricesContainer } from '@/ui/CardPricesContainer'

function CardBlankImage({ visible }) {
  let classes = 'h-[210px] w-[210px] rounded bg-silkway-light-gray'
  classes += visible ? ' animate-pulse' : ' opacity-0'

  return <div className={classes}></div>
}

function CardBlankPrice({ visible }) {
  let classes = 'rounded bg-silkway-light-gray h-[24px] w-[40%]'
  classes += visible ? ' animate-pulse' : ' opacity-0'

  return <div className={classes}></div>
}

function CardBlankTitle({ visible }) {
  let classes = 'rounded bg-silkway-light-gray h-[24px] w-[90%]'
  classes += visible ? ' animate-pulse' : ' opacity-0'

  return <div className={classes}></div>
}

export function BlankCard({ visible = true }) {
  return (
    <CardContainer>
      <CardBlankImage visible={visible} />

      <CardPricesContainer>
        <CardBlankPrice visible={visible} />
      </CardPricesContainer>

      <CardBlankTitle visible={visible} />
    </CardContainer>
  )
}
