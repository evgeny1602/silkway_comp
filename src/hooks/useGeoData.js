import { useState, useEffect } from "react"
import { detect as cityDetect } from "../api/city"
import { useLocalStorage } from "./useLocalStorage"

export function UseGeoData() {
    const [geoData, setGeoData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)   

    const {setItem, getItem} = useLocalStorage('geo_data')
    
    useEffect(() => {
        const manageGeoData = async () => {
            const localGeoData = await getItem()   
            if (localGeoData) {
                setGeoData(localGeoData)
            } else {
                setIsLoading(true)
                setError(null)
                try {
                    const fetchedGeoData = await cityDetect()
                    setItem(fetchedGeoData)
                } catch (error) {
                    setError(error)
                    console.log(error)
                }   
                setIsLoading(false)             
            }
        }

        manageGeoData()
    }, [])

    return {geoData, isLoading, error}
    
}
