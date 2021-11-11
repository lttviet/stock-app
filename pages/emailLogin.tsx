import { Grid, Typography } from '@mui/material'
import { getAdditionalUserInfo, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth"
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuth } from 'reactfire'

const EmailLogin: NextPage = () => {
  const [error, setError] = useState(false)

  const router = useRouter()
  const auth = useAuth()

  useEffect(() => {
    const email = window.localStorage.getItem('email')

    if (!email) {
      console.error('No email in localStorage.')
      setError(true)
      return
    }

    if (router.isReady && isSignInWithEmailLink(auth, router.asPath)) {
      signInWithEmailLink(auth, email, router.asPath).then(
        (userCred) => {
          setError(false)
          window.localStorage.removeItem('email')

          if (getAdditionalUserInfo(userCred)?.isNewUser) {
            router.push('/newUser')
          } else {
            router.push('/profile')
          }
        },
        (e) => {
          console.error(e.message)
          setError(true)
        }
      )
    }
  }, [auth, router])


  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Typography variant="h4">
        {error ? `Can't login with this link.` : 'Checking link...'}
      </Typography>
    </Grid>
  )
}

export default EmailLogin
