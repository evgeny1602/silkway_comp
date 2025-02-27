export function fixURL(url) {
  let result = url.replace('://', '###')
  result = result.replaceAll('//', '/')
  result = result.replaceAll('###', '://')
  return result
}

export function formatMoney(amount) {
  let buffer = ''
  let result = ''
  let amountStr = `${amount}`
  let fractions = ''
  if (amountStr.includes('.')) {
    ;[amountStr, fractions] = amountStr.split('.')
  }
  for (let i = 1; i <= amountStr.length; i++) {
    buffer = amountStr.at(-i) + buffer
    if (buffer.length == 3) {
      result = buffer + ' ' + result
      buffer = ''
    }
  }
  result = buffer + ' ' + result
  result = result.trim()
  if (fractions != '') {
    result += '.' + fractions
  }
  return result
}

export function itemsCountPostfix(itemsCount, postfixVariants) {
  // const postfixes = [
  //     'товар',
  //     'товара',
  //     'товаров'
  // ]

  const lastOneDigit = parseInt(`${itemsCount}`.at(-1))
  const lastTwoDigits = parseInt(`0${itemsCount}`.slice(-2))

  if (lastTwoDigits > 4 && lastTwoDigits < 21) {
    return postfixVariants[2]
  }
  if (lastOneDigit == 1) {
    return postfixVariants[0]
  }
  if ([2, 3, 4].includes(lastOneDigit)) {
    return postfixVariants[1]
  }
  if ([5, 6, 7, 8, 9, 0].includes(lastOneDigit)) {
    return postfixVariants[2]
  }
}

export function getGlobalData(k) {
  if (k in window) {
    return window[k]
  }

  return {}
}

export function searchProduct(query, searchUrl) {
  if (query.length < 3) {
    return
  }

  location.href = searchUrl.replace('{{search_query}}', query)
}

export function disableDocumentScroll() {
  document.body.classList.add('overflow-y-hidden')
}

export function enableDocumentScroll() {
  document.body.classList.remove('overflow-y-hidden')
}

export const cartSum = (cartItems) => {
  return cartItems
    .map((item) => item.quantity * item.price)
    .reduce((s, x) => s + x, 0)
}

export const getSlugFromUrl = (url) => {
  let slug = url
  if (slug.at(-1) == '/') {
    slug = slug.slice(0, -1)
  }
  return slug.split('/').at(-1)
}

export const uniqueArr = (arr) =>
  arr.filter((v, idx, a) => a.indexOf(v) === idx)

export const calcPaginationPages = (pagesTotal, curPage) => {
  let pages = [
    1,
    Math.max(1, curPage - 1),
    curPage,
    Math.min(pagesTotal, curPage + 1),
    pagesTotal,
  ]

  pages = uniqueArr(pages)

  let pages2 = []
  for (let i = 0; i < pages.length - 1; i++) {
    pages2.push(pages[i])
    if (pages[i + 1] - pages[i] > 1) {
      pages2.push(-1)
    }
  }
  pages2.push(pages.at(-1))
  return pages2
}
