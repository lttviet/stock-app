import { Button, Grid, TextField, Typography } from '@mui/material'
import { ChangeEvent, KeyboardEvent, useState } from 'react'
import isEmail from 'validator/lib/isEmail'

const LoginForm = () => {
  const [touched, setTouched] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState(false)
  const [errorText, setErrorText] = useState('')
  const [sentEmail, setSentEmail] = useState(false)

  const updateTouched = () => {
    setTouched(true)
    setError(true)
    setErrorText('Required')
  }

  const updateEmail = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isEmail(event.target.value)) {
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

  const emailMagicLink = async (_?: any) => {
    if (!touched || error) return
    window.localStorage.setItem('email', email)

    setSentEmail(true)

    try {
      await fetch(
        '/api/emailMagicLink',
        { method: 'POST', body: JSON.stringify({ email }) }
      )
    } catch (e: any) {
      console.error(e)
      setError(true)
    }
  }

  if (!sentEmail) {
    return (
      <Grid container>
        <Grid
          container item
          spacing={3}
          direction="column"
          xs={12} md={6} lg={4}
        >
          <Grid item>
            <Typography variant="h4">
              Sign in
            </Typography>
          </Grid>

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
        </Grid>
      </Grid>
    )
  }

  if (error) {
    return (
      <Typography variant="body1">
        Can&apos;t email. Please try again later.
      </Typography>
    )
  }

  return (
    <Typography variant="body1">
      Please check your email.
    </Typography>
  )
}

export default LoginForm;
