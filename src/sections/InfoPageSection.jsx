import { SectionContainer } from '../ui/SectionContainer'
import { SectionInnerContainer } from '../ui/SectionInnerContainer'

import { InfoPageAbout } from '../sections/InfoPageAbout'
import { InfoPageOpt } from '../sections/InfoPageOpt'
import { InfoPageDelivery } from '../sections/InfoPageDelivery'
import { InfoPageReviews } from '../sections/InfoPageReviews'
import { InfoPageNews } from '../sections/InfoPageNews'
import { InfoPageContacts } from '../sections/InfoPageContacts'

export function InfoPageSection() {
  const path = window.infoPageData?.path || null

  if (!path) {
    return
  }

  return (
    <SectionContainer className="pb-[30px]">
      <SectionInnerContainer>
        {path == 'about' && <InfoPageAbout />}
        {path == 'about/optovie-uslovia' && <InfoPageOpt />}
        {path == 'about/optovie-uslovia' && <InfoPageOpt />}
        {path == 'about/delivery' && <InfoPageDelivery />}
        {path == 'reviews' && <InfoPageReviews />}
        {path == 'news' && <InfoPageNews />}
        {path == 'about/contacts' && <InfoPageContacts />}
      </SectionInnerContainer>
    </SectionContainer>
  )
}
