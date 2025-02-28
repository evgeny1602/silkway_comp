import { useState } from 'react'
import pageNextIcon from '../assets/page_next_icon.svg'

import { calcPaginationPages } from '../utils'

function PaginationContainer({ children }) {
  return (
    <div className="bg-white rounded w-full flex justify-center items-center gap-[5px] max-[640px]:gap-[2px] h-[68px] max-[640px]:h-[56px] p-[10px] font-sans text-silkway-dark-chocolate text-base max-[640px]:text-xs">
      {children}
    </div>
  )
}

function PageButtonContainer({
  children,
  isActive = false,
  onClick = null,
  isHoverable = true,
}) {
  let classes =
    'rounded p-[10px] transition-colors flex justify-center items-center w-[50px] h-[50px] max-[640px]:w-[40px] max-[640px]:h-[40px]'

  if (isHoverable) {
    classes += ' hover:bg-silkway-light-orange'
  }

  if (isActive) {
    classes +=
      ' bg-silkway-orange border-silkway-dark-orange border shadow-inner shadow-white/45'
  }

  return (
    <button
      onClick={onClick}
      className={classes}
    >
      {children}
    </button>
  )
}

function PagePrev({ onClick }) {
  return (
    <PageButtonContainer onClick={onClick}>
      <img
        src={pageNextIcon}
        className="rotate-180"
      />
    </PageButtonContainer>
  )
}

function PageNext({ onClick }) {
  return (
    <PageButtonContainer onClick={onClick}>
      <img src={pageNextIcon} />
    </PageButtonContainer>
  )
}

function PageButton({ isActive = false, onClick, pageNum }) {
  return (
    <PageButtonContainer
      isActive={isActive}
      onClick={pageNum == -1 ? null : onClick}
      isHoverable={!isActive && pageNum > 0}
    >
      {pageNum == -1 ? '...' : pageNum}
    </PageButtonContainer>
  )
}

export function Pagination({
  itemsTotal,
  pageSize,
  initPageNum,
  onPageClick,
  isClickable,
}) {
  const [page, setPage] = useState(initPageNum)

  const pagesTotal = Math.ceil(itemsTotal / pageSize)
  const pages = calcPaginationPages(pagesTotal, page)

  const handlePageClick = (pageNum) => {
    if (isClickable) {
      setPage(pageNum)
      onPageClick(pageNum)
    }
  }

  const handlePrevClick = () => {
    handlePageClick(Math.max(1, page - 1))
  }

  const hanldeNextClick = () => {
    handlePageClick(Math.min(pagesTotal, page + 1))
  }

  return (
    <PaginationContainer>
      {page > 1 && <PagePrev onClick={handlePrevClick} />}

      {pages.map((p, idx) => (
        <PageButton
          key={idx}
          pageNum={p}
          onClick={() => handlePageClick(p)}
          isActive={p == page}
        />
      ))}

      {page < pagesTotal && <PageNext onClick={hanldeNextClick} />}
    </PaginationContainer>
  )
}
