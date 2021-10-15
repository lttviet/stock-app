import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { tickers } from '../lib/tickers'
import { SentimentData } from '../lib/types'

// TODO refactor hooks
export default function useSentiment(ticker: string) {
  const [stockData, setStockData] = useState<SentimentData | null>(null)

  const fletcher = async (url: string) => {
    const res = await fetch(url)
    if (!res.ok) throw new Error(res.statusText)
    return res.json()
  }

  const { data, error } = useSWR(
    (ticker && tickers.includes(ticker.toUpperCase()))
      ? `/api/sentiment/${ticker.toUpperCase()}`
      : null, fletcher)

  useEffect(() => {
    setStockData((error || !data) ? null : data)
  }, [data, error])

  return {
    data: stockData,
    loading: !error && !data,
    error: error
  }
}
