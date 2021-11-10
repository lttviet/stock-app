import useSWR from 'swr'
import { isValid } from '../lib/tickers'
import { SentimentData } from '../lib/types'

export default function useSentiment(ticker: string) {
  const fletcher = async (url: string) => {
    const res = await fetch(url)
    if (!res.ok) throw new Error(res.statusText)
    return res.json()
  }

  const { data } = useSWR<SentimentData>(
    isValid(ticker) ? `/api/sentiment/${ticker.toUpperCase()}` : null,
    fletcher,
    { suspense: true },
  )

  return { data }
}
