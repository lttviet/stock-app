import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { tickers } from '../lib/tickers'
import { StockData } from '../lib/types'

export default function useCandle(ticker: string) {
  const [stockData, setStockData] = useState<StockData[]>([])

  const fletcher = async (url: string) => {
    const res = await fetch(url)
    if (!res.ok) throw new Error(res.statusText)
    return res.json()
  }

  const { data, error } = useSWR(
    (ticker && tickers.includes(ticker.toUpperCase()))
      ? `/api/candle/${ticker.toUpperCase()}`
      : null, fletcher)

  useEffect(() => {
    setStockData((error || !data) ? [] : data)
  }, [data, error])

  return {
    data: stockData,
    loading: !error && !data,
    error: error
  }
}
