import { useState, useEffect } from "react";

export function useAutocomplete(fetcher, query) {
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetcher(query, setResults, setIsLoading, setError)
  }, [query])

  return { results, isLoading, error }
}