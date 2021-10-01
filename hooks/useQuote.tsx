import useSWR from 'swr'

export default function useQuote(symbol: string) {
  symbol = symbol.toUpperCase()

  const fletcher = (url: string) => fetch(url).then(r => r.json())
  const { data, error } = useSWR(`/api/stock/${symbol}`, fletcher, { refreshInterval: 2000 })

  return {
    quote: data,
    isLoading: !error && !data,
    isError: error
  }
}
