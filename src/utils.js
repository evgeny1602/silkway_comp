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

export function itemsCountPostfix(itemsCount, postfixes) {
    // const postfixes = [
    //     'товар',
    //     'товара',
    //     'товаров'
    // ]

    const lastOneDigit = parseInt(`${itemsCount}`.at(-1))
    const lastTwoDigits = parseInt(`0${itemsCount}`.slice(-2))

    if ( (lastTwoDigits > 4) && (lastTwoDigits < 21) ) {
        return postfixes[2]
    }
    if (lastOneDigit == 0) {
        return postfixes[2]
    }
    if (lastOneDigit == 1) {
        return postfixes[0]
    }
    if ([2, 3, 4].includes(lastOneDigit)) {
        return postfixes[1]
    }
}