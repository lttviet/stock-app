import { Button, Grid, LinearProgress, TextField, Typography } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from 'react'
import Layout from '../components/layout'
import useRequireNotSignedIn from '../hooks/useRequireNotSignedIn'

const WrappedLogin: NextPage = () => {
  const { show } = useRequireNotSignedIn('/profile')

  if (!show) return <LinearProgress />
  return <Login />
}

const Login: NextPage = () => {
  // TODO look into form library
  // TODO look into email validator library
  const [touched, setTouched] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState(false)
  const [errorText, setErrorText] = useState('')
  const [sentEmail, setSentEmail] = useState(false)

  const updateTouched = (_: MouseEvent<HTMLDivElement>) => {
    setTouched(true)
    setError(true)
    setErrorText('Required')
  }

  const updateEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const re = /\S+@\S+\.\S+/
    if (!re.test(event.target.value)) {
      setError(true)
      setErrorText('Not a valid email.')
    } else {
      setError(false)
      setErrorText('')
    }

    setEmail(event.target.value)
  }

  const onPressEnter = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') emailMagicLink()
  }

  const emailMagicLink = (_?: any) => {
    if (!touched || error) return
    window.localStorage.setItem('email', email)

    setSentEmail(true)
    fetch(
      '/api/emailMagicLink',
      { method: 'POST', body: JSON.stringify({ email }) }
    )
  }

  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>

      <Grid container spacing={3}>
        <Grid
          container item
          spacing={3}
          direction="column"
          xs={12} md={6} lg={4}
        >
          <Grid item>
            <Typography variant="h4">Sign in</Typography>
          </Grid>

          {!sentEmail &&
            <>
              <Grid item>
                <TextField
                  label="Email"
                  placeholder="viet@example.com"
                  fullWidth
                  error={error}
                  helperText={errorText}
                  value={email}
                  onChange={updateEmail}
                  onClick={updateTouched}
                  onKeyDown={onPressEnter}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!touched || error}
                  onClick={emailMagicLink}
                >
                  Email link
                </Button>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  Firebase is used for passwordless authentication.
                </Typography>
              </Grid>
            </>
          }

          {sentEmail &&
            <Grid item>
              <Typography variant="body1">
                Please check your email.
              </Typography>
            </Grid>
          }
        </Grid>
      </Grid>
    </Layout>
  )
}

export default WrappedLogin;
