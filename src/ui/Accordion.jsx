import { Children, useState, useRef } from 'react'

export function AccordionTitleText({ children, className }) {
  return <div className={className}>{children}</div>
}

export function AccordionTitleArrow({ children, className }) {
  return <div className={className}>{children}</div>
}

export function AccordionContent({ children, isOpen, className = null }) {
  const contentRef = useRef()

  return (
    <div
      ref={contentRef}
      className="overflow-hidden transition-all"
      style={
        isOpen ? { height: contentRef.current.scrollHeight } : { height: '0px' }
      }
    >
      <div className={className}>{children}</div>
    </div>
  )
}

export function AccordionTitle({
  children,
  onClick,
  isOpen,
  className = null,
}) {
  const style = isOpen ? { rotate: '180deg' } : null

  let classes = 'flex flex-nowrap justify-between w-full cursor-pointer'
  if (className) {
    classes += ' ' + className
  }

  return (
    <div
      onClick={onClick}
      className={classes}
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
          return (
            <div
              className="transition-all"
              style={style}
            >
              {child.props.children}
            </div>
          )
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
