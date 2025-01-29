import { searchCityUrl, detectCityUrl } from "../config"

export const detect = async () => {
    const resp = await fetch(detectCityUrl)   

    if (!resp.ok) throw new Error(resp.statusText)

    const data = await resp.json()   

    if (data.error != '') throw new Error('An error while loading geo data')

    return {
        city: {
            id: data.city.id,
            name: data.city.name_ru
        },
        region: {
            id: data.region.id,
            name: data.region.name_ru
        },
        country: {
            id: data.country.id,
            name: data.country.name_ru
        }
    }
}

export const autocomplete = async query => {
    if (query == '') return []

    if (query.length < 3) return []

    const url = searchCityUrl.replace('{{search_query}}', query)

    const resp = await fetch(url)
    if (!resp.ok) throw new Error(resp.statusText)
        
    const json = await resp.json()
    
    const resultItems = []
    for (let k of Object.keys(json)) {
        let {
            CITY: city,
            REGION: region,
            COUNTRY: country
        } = json[k]

        if ([city, country].includes(null)) continue

        if (!region) region = ''

        const title = `${country}, ${region}, ${city}`

        resultItems.push({ city, region, country, title })
    }

    return resultItems    

}