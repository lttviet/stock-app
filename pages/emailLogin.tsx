import { Grid, Typography } from '@mui/material'
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth"
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import firebaseApp from '../lib/firebase'

const EmailLogin: NextPage = () => {
  const [error, setError] = useState(false)

  const router = useRouter()
  const auth = getAuth(firebaseApp)

  useEffect(() => {
    const email = window.localStorage.getItem('email')

    if (!email) {
      console.error('No email in localStorage.')
      setError(true)
      return
    }

    if (isSignInWithEmailLink(auth, router.asPath)) {
      signInWithEmailLink(auth, email, router.asPath).then(
        () => router.push('/profile'),
        (e) => {
          console.error(e)
          setError(true)
        }
      )
    }
  }, [router, auth])


  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Typography variant="h4">
        {error ? `Can't login with this link.` : 'Checking link...'}
      </Typography>
    </Grid>
  )
}

export default EmailLogin
