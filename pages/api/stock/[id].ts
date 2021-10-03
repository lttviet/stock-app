import type { NextApiRequest, NextApiResponse } from 'next'

type QuoteResponse = {
  price: number
} | {
  error: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<QuoteResponse>
) {
  const {
    query: { id },
    method
  } = req

  if (!id) {
    res.status(404).json({ error: 'Missing stock symbol' })
    return
  }

  if (method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ error: `Method ${method} Not Allowed` })
    return
  }

  try {
    const url = `${process.env.FINNHUB_QUOTE_API_URL}&symbol=${id}`
    const response = await fetch(url)
    const jsonData = await response.json()

    if (!response.ok) {
      res.status(response.status).json(jsonData)
      return
    }

    res.status(200).json({ price: jsonData.c })
  } catch (e: any) {
    console.error(e)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}