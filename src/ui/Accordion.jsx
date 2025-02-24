import { Children, useState, useRef } from 'react'

export function AccordionTitleText({ children }) {
  return <div>{children}</div>
}

export function AccordionTitleArrow({ children }) {
  return <div>{children}</div>
}

export function AccordionContent({ children, isOpen }) {
  const contentRef = useRef()

  return (
    <div
      ref={contentRef}
      className="overflow-hidden transition-all"
      style={
        isOpen ? { height: contentRef.current.scrollHeight } : { height: '0px' }
      }
    >
      {children}
    </div>
  )
}

export function AccordionTitle({ children, onClick, isOpen }) {
  const style = isOpen ? { rotate: '180deg' } : null

  return (
    <div
      onClick={onClick}
      className="flex flex-nowrap justify-between w-full"
    >
      <div>
        {Children.map(children, (child) => {
          if (child.type == AccordionTitleText) {
            return (
              <child.type
                {...child.props}
                children={child.props.children}
              />
            )
          }
        })}
      </div>
      {Children.map(children, (child) => {
        if (child.type == AccordionTitleArrow) {
          return <div style={style}>{child.props.children}</div>
        }
      })}
    </div>
  )
}

export function AccordionItem({ children, onClick, className, isOpen }) {
  return (
    <div className={className}>
      {Children.map(children, (child) => {
        return (
          <child.type
            {...child.props}
            onClick={onClick}
            children={child.props.children}
            isOpen={isOpen}
          />
        )
      })}
    </div>
  )
}

export function Accordion({
  children,
  isMultiple = true,
  initOpenedIndex = null,
}) {
  const [openedIndexes, setOpenedIndexes] = useState(
    initOpenedIndex == null ? [] : [initOpenedIndex]
  )

  const toggleOpened = (index) => {
    let newOpenedIndexes
    if (isMultiple) {
      newOpenedIndexes = [...openedIndexes, index]
      if (openedIndexes.includes(index)) {
        newOpenedIndexes = openedIndexes.filter((el) => el != index)
      }
    }
    if (!isMultiple) {
      newOpenedIndexes = [index]
      if (openedIndexes.includes(index)) {
        newOpenedIndexes = []
      }
    }
    setOpenedIndexes(newOpenedIndexes)
  }

  return (
    <div>
      {Children.map(children, (child, index) => (
        <child.type
          onClick={() => {
            toggleOpened(index)
          }}
          {...child.props}
          children={child.props.children}
          isOpen={openedIndexes.includes(index)}
        />
      ))}
    </div>
  )
}
