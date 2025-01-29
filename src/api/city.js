import { searchCityUrl } from "../config";

export const autocomplete = async (
    query,
    setResults,
    setIsLoading,
    setError
) => {
    if (query == '') {
        setResults([])  
        return
    }

    if (query.length < 3) {
        setResults([])  
        return
    }

    const url = searchCityUrl.replace('{{search_query}}', query)

    setIsLoading(true);

    try {
        const resp = await fetch(url)
        if (!resp.ok) {
            throw new Error(resp.statusText)
        }
        const json = await resp.json()
        setIsLoading(false)  
        
        const resultItems = []
        for (let k of Object.keys(json)) {
            let {
                CITY: city,
                REGION: region,
                COUNTRY: country
            } = json[k]
            if ([city, country].includes(null)) {
                continue
            }
            if (!region) {
                region = ''
            }
            const title = `${country}, ${region}, ${city}`
            resultItems.push({ city, region, country, title })
        }
        
        setResults(resultItems)
        setError(null)
    } catch (error) {
        setError(`${error} Could not Fetch Data `)
        setIsLoading(false)
    }
}