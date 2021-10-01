import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  error: string
} | {
  c: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    query: { id },
    method
  } = req

  if (method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ error: `Method ${method} Not Allowed` })
    return
  }

  try {
    const url = `${process.env.FINNHUB_QUOTE_API_URL}&symbol=${id}`
    const response = await fetch(url)

    if (!response.ok) {
      throw response.statusText
    }

    const jsonData: Data = await response.json()
    res.status(200).json(jsonData)
  }
  catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
