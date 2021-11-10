import useSWR from 'swr'
import { isValid } from '../lib/tickers'
import { StockData } from '../lib/types'

export default function useCandle(ticker: string) {
  const fletcher = async (url: string) => {
    const res = await fetch(url)
    if (!res.ok) throw new Error(res.statusText)
    return res.json()
  }

  const { data } = useSWR<StockData[]>(
    isValid(ticker) ? `/api/candle/${ticker.toUpperCase()}` : null,
    fletcher,
    { suspense: true },
  )

  return { data }
}
