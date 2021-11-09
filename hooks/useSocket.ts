import { useEffect, useRef, useState } from "react"

export interface Quote {
  symbol: string
  price: number
}

function createQuote(s: string): Quote | null {
  try {
    const obj = JSON.parse(s)

    if (obj.type !== 'trade') return null

    return {
      symbol: obj.data[0].s,
      price: obj.data[0].p
    }
  }
  catch (error) {
    return null
  }
}

const initialQuote: Quote = { symbol: '', price: 0 }

export default function useSocket(symbol: string) {
  const [quote, setQuote] = useState<Quote>(initialQuote)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const socket = useRef<WebSocket | null>(null)

  const url = process.env.NEXT_PUBLIC_FINNHUB_WEBSOCKET || ''

  useEffect(() => {
    socket.current = new WebSocket(url)

    socket.current.onopen = () => setLoading(false)
    socket.current.onerror = () => {
      setQuote(initialQuote)
      setLoading(false)
      setError(true)
    }

    socket.current.addEventListener('message', (event) => {
      const quote = createQuote(event.data)
      if (quote) setQuote(quote)
    })


    return () => {
      socket.current?.close()
    }
  }, [url])

  useEffect(() => {
    setQuote(initialQuote)

    if (!socket.current) return

    if (socket.current.readyState === 0) {
      socket.current.addEventListener('open', () =>
        socket.current?.send(
          JSON.stringify({ 'type': 'subscribe', 'symbol': symbol })
        )
      )
    }
    else if (socket.current.readyState === 1) {
      socket.current.send(
        JSON.stringify({ 'type': 'subscribe', 'symbol': symbol })
      )
    }

    return () => {
      setQuote(initialQuote)
      if (socket.current?.readyState === 1) {
        socket.current?.send(
          JSON.stringify({ 'type': 'unsubscribe', 'symbol': symbol })
        )
      }
    }
  }, [symbol])

  return { quote, loading, error }
}
