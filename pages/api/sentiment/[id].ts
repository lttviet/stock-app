import type { NextApiRequest, NextApiResponse } from 'next'
import { tickers } from '../../../lib/tickers'
import { SentimentData } from '../../../lib/types'
import { getTimestamp } from '../../../lib/utils'

type SentimentResponse = SentimentData[] | {
  error: string
}

// refactor api
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SentimentResponse>
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
    return res.status(405).json({ error: `Method ${method} Not Allowed` })
  }

  const date = new Date()
  const today = date.toISOString().split('T')[0]

  date.setDate(date.getDate() - 7)
  const oneWeekAgo = date.toISOString().split('T')[0]

  try {
    const url = `${process.env.FINNHUB_SENTIMENT_API_URL}&symbol=${id}&from=${oneWeekAgo}&to=${today}`
    const response = await fetch(url)
    const jsonData = await response.json()

    if (!response.ok) {
      return res.status(response.status).json(jsonData)
    }

    const formattedData = jsonData.reddit.reduce(
      (summary: SentimentData, curr: SentimentData) => ({
        mention: summary.mention + curr.mention,
        positiveMention: summary.positiveMention + curr.positiveMention,
        negativeMention: summary.positiveMention + curr.negativeMention,
      }),
      { mention: 0, positiveMention: 0, negativeMention: 0 } as SentimentData
    )
    res.status(200).json(formattedData)
  } catch (e: any) {
    console.error(e.message)
    res.status(500).json({ error: e.message })
  }
}
