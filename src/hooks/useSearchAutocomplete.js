import { useState, useEffect } from "react";

export function useSearchAutocomplete(url, query) {
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchResults = async () => {
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
                url,
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

    fetchResults()
  }, [query])

  return { results, isLoading, error }
}