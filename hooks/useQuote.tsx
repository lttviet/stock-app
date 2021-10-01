import useSWR from 'swr'

export default function useQuote(symbol: string) {
  symbol = symbol.toUpperCase()

  const fletcher = async (url: string) => {
    const res = await fetch(url)

    if (!res.ok) {
      throw new Error(res.statusText)
    }

    return res.json()
  }

  const { data, error } = useSWR(`/api/stock/${symbol}`, fletcher, { refreshInterval: 2000 })

  return {
    quote: data,
    isLoading: !error && !data,
    isError: error
  }
}
