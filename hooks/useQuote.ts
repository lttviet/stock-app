import useSWR from 'swr'

export default function useQuote(symbol: string | null) {
  if (!symbol) {
    return {
      quote: null,
      isLoading: false,
      isError: true
    }
  }

  const fletcher = async (url: string) => {
    const res = await fetch(url)
    if (!res.ok) throw new Error(res.statusText)

    return res.json()
  }

  const { data, error } =
    useSWR(
      `/api/stock/${symbol.toUpperCase()}`,
      fletcher
    )

  return {
    quote: data,
    isLoading: !error && !data,
    isError: error
  }
}
