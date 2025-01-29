export function formatMoney(amount) {
    let buffer = ''
    let result = ''
    let amountStr = `${amount}`
    for (let i = 1; i <= amountStr.length; i++) {
        buffer = amountStr.at(-i) + buffer
        if (buffer.length == 3) {
            result = buffer + ' ' + result
            buffer = ''
        }
    }
    result = buffer + ' ' + result
    result = result.trim()
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

    if ( (lastTwoDigits > 4) && (lastTwoDigits < 21) ) {
        return postfixVariants[2]
    }
    if (lastOneDigit == 0) {
        return postfixVariants[2]
    }
    if (lastOneDigit == 1) {
        return postfixVariants[0]
    }
    if ([2, 3, 4].includes(lastOneDigit)) {
        return postfixVariants[1]
    }
}

export function getLobalData(k) {
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
    document.body.classList.add("overflow-y-hidden")
}

export function enableDocumentScroll() {
    document.body.classList.remove("overflow-y-hidden")
}