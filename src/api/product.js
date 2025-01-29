import { searchProductUrl } from "../config"

export const autocomplete = async (
    query,
    setResults,
    setIsLoading,
    setError    
) => {
    if (!query) {
        setResults([])  
        return
    }

    if (query.length < 3) {
        setResults([])  
        return
    }

    const body = new FormData()
    body.append('SEARCH_QUERY', query)

    setIsLoading(true);

    try {
        const resp = await fetch(
            searchProductUrl,
            { method: 'POST', body }
        )
        if (!resp.ok) {
            throw new Error(resp.statusText)
        }
        const json = await resp.json()
        setIsLoading(false)                    
        setResults(json.items)
        setError(null)
    } catch (error) {
        setError(`${error} Could not Fetch Data `)
        setIsLoading(false)
    }
}