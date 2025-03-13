import { create } from 'zustand'

const parseOptions = (data) => {
  let options = {}

  for (const item in data) {
    let parts = item.split('|')
    for (const part of parts) {
      let [k, v] = part.split('=')
      let [optionCode, optionName] = k.split('#')
      if (!(optionCode in options)) {
        options[optionCode] = {
          name: optionName,
          values: [],
        }
      }
      if (!options[optionCode].values.includes(v)) {
        options[optionCode].values.push(v)
      }
    }
  }

  for (const optionCode in options) {
    options[optionCode].values.sort()
  }

  return options
}

const parseVarinats = (data) => {
  let variants = {}

  for (const item in data) {
    let parts = item.split('|')
    let variantK = []
    for (const part of parts) {
      let [k, v] = part.split('=')
      let [optionCode, optionName] = k.split('#')
      variantK.push(`${optionCode}=${v}`)
    }
    variants[variantK.join('|')] = data[item]
  }

  return variants
}

const isInVariant = (codeValues, variant) => {
  if (codeValues.length == 0) {
    return false
  }

  for (const codeValue of codeValues) {
    if (!variant.includes(codeValue)) {
      return false
    }
  }

  return true
}

export const useProductInfoStore = create((set, get) => ({
  activeIdx: 0,
  pictureUrls: window.productData ? window.productData.picture_urls : [],
  productVariants: window.productData
    ? parseVarinats(window.productData.variants)
    : {},
  productOptions: window.productData
    ? parseOptions(window.productData.variants)
    : {},
  selectedOptions: {},

  getSelectedVariantQty: () => {
    let codeValues = []
    for (const selectedOption in get().selectedOptions) {
      codeValues.push(
        `${selectedOption}=${get().selectedOptions[selectedOption]}`
      )
    }

    if (codeValues.length < Object.keys(get().productOptions).length) {
      return -1
    }

    for (const productVariant in get().productVariants) {
      if (isInVariant(codeValues, productVariant)) {
        return get().productVariants[productVariant]
      }
    }

    return -1
  },

  isOptionValueSelected: (code, value) =>
    get().selectedOptions[code]
      ? get().selectedOptions[code] == value
        ? true
        : false
      : false,

  isOptionValueEnabled: (code, value) => {
    const otherSelectedOptionCodes = Object.keys(get().selectedOptions).filter(
      (item) => item != code
    )

    if (otherSelectedOptionCodes.length == 0) {
      return true
    }

    let codeValues = [`${code}=${value}`]
    for (const otherOptionCode of otherSelectedOptionCodes) {
      const otherOptionValue = get().selectedOptions[otherOptionCode]
      codeValues.push(`${otherOptionCode}=${otherOptionValue}`)
    }

    for (const productVariant in get().productVariants) {
      if (isInVariant(codeValues, productVariant)) {
        return true
      }
    }

    return false
  },

  selectOption: (optionCode, optionValue) =>
    set((state) => ({
      ...state,
      selectedOptions: { ...state.selectedOptions, [optionCode]: optionValue },
    })),
  setActiveIdx: (idx) => set((state) => ({ ...state, activeIdx: idx })),
  nextSlide: () =>
    set((state) => ({
      ...state,
      activeIdx: Math.min(state.activeIdx + 1, state.pictureUrls.length - 1),
    })),
  prevSlide: () =>
    set((state) => ({ ...state, activeIdx: Math.max(state.activeIdx - 1, 0) })),
}))
