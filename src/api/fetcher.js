export const fetchData = async (url, method, reqData, setIsLoading) => {
  const body = new FormData()

  for (let k in reqData) {
    body.append(k, reqData[k])
  }

  setIsLoading(true)

  const resp = await fetch(url, { method, body })

  if (!resp.ok) {
    throw new Error(resp.statusText)
  }

  const json = await resp.json()

  setIsLoading(false)

  return json
}
