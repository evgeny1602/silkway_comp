import { searchCityUrl, setCityUrl } from "../config"

export const set = async cityId => {
    if (!cityId) return []

    const url = setCityUrl.replace('{{city_id}}', cityId)

    const resp = await fetch(url)

    if (!resp.ok) throw new Error(resp.statusText)
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
            CITY_ID: cityId,
            CITY: city,
            REGION: region,
            COUNTRY: country
        } = json[k]

        if ([city, country].includes(null)) continue

        if (!region) region = ''

        const title = `${country}, ${region}, ${city}`

        resultItems.push({ city, region, country, title, cityId })
    }

    return resultItems    

}