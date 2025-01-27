export function useGlobalData(globalKey) {
    if (globalKey in window) {
        return window[globalKey]
    }

    return {}
}