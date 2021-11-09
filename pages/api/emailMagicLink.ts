import { getAuth, sendSignInLinkToEmail } from 'firebase/auth'
import type { NextApiRequest, NextApiResponse } from 'next'
import firebaseApp from '../../lib/firebase'

type RequestJson = {
  email: string
}

type QuoteResponse = {
  error: string
} | {
  status: string
}

const actionCodeSettings = {
  url: process.env.EMAIL_LOGIN_URL || 'http://localhost:3000/emailLogin',
  handleCodeInApp: true
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<QuoteResponse>
) {
  const {
    body,
    method
  } = req

  if (method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ error: `Method ${method} Not Allowed` })
    return
  }

  const json: RequestJson = JSON.parse(body)
  const email = json.email

  try {
    const auth = getAuth(firebaseApp)
    await sendSignInLinkToEmail(auth, email, actionCodeSettings)
    res.status(200).json({ status: 'Email sent.' })
  } catch (error: any) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
