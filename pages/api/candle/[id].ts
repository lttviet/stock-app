import type { NextApiRequest, NextApiResponse } from 'next'
import { tickers } from '../../../lib/tickers'
import { StockData } from '../../../lib/types'
import { getTimestamp } from '../../../lib/utils'

type CandleResponse = StockData[] | {
  error: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CandleResponse>
) {
  const {
    query: { id },
    method
  } = req

  if (!id) {
    return res.status(404).json({ error: 'Missing ticker' })
  }

  if (Array.isArray(id)) {
    return res.status(400).json({ error: 'Bad formatted ticker' })
  }

  if (!tickers.includes(id)) {
    return res.status(400).json({ error: 'Ticker is not in approved list' })
  }

  if (method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ error: `Method ${method} Not Allowed` })
    return
  }

  const date = new Date()
  const today = getTimestamp(date)

  date.setMonth(date.getMonth() - 1)
  const oneMonthAgo = getTimestamp(date)

  try {
    const url = `${process.env.FINNHUB_CANDLE_API_URL}&symbol=${id}&resolution=D&from=${oneMonthAgo}&to=${today}`
    const response = await fetch(url)
    const jsonData = await response.json()

    if (!response.ok) {
      res.status(response.status).json(jsonData)
      return
    }

    const formattedData = jsonData.c.map(
      (price: number, index: number) => (
        { close: price, date: jsonData.t[index] * 1000 }
      )
    )

    res.status(200).json(formattedData)
  } catch (e: any) {
    console.error(e.message)
    res.status(500).json({ error: e.message })
  }
}
