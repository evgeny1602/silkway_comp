import {
  Accordion,
  AccordionItem,
  AccordionTitle,
  AccordionContent,
  AccordionTitleArrow,
  AccordionTitleText,
} from '@/ui/Accordion'

import arrowRightIcon from '../assets/arrow_right_icon.svg'

function ArrowDown() {
  return (
    <img
      src={arrowRightIcon}
      className="rotate-90"
    />
  )
}

export function Sidebar() {
  return (
    <div>
      <Accordion>
        <AccordionItem>
          <AccordionTitle>
            <AccordionTitleText>Title 1</AccordionTitleText>
            <AccordionTitleArrow>
              <ArrowDown />
            </AccordionTitleArrow>
          </AccordionTitle>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem>
          <AccordionTitle>
            <AccordionTitleText>Title 2</AccordionTitleText>
            <AccordionTitleArrow>
              <ArrowDown />
            </AccordionTitleArrow>
          </AccordionTitle>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
