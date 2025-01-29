import { useState, useEffect } from "react";

export function useFetch(fetcher, query) {
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const manageFetching = async () => {
      setError(null)
      setIsLoading(true)
      try {
        const results = await fetcher(query)
        setResults(results)      
      } catch (error) {
        console.log(error)
        setError(error)
      }
    }
    console.log(fetcher.name, query)
    manageFetching()
  }, [query])

  return { results, isLoading, error }
}