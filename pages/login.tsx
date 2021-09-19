import { Button, Grid, TextField, Typography } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'

type LoginProps = {
  loggedIn: boolean
}

const Login: NextPage<LoginProps> = ({ loggedIn }: LoginProps) => {
  return (
    <>
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
          <Grid item>
            <TextField
              label="Email"
              fullWidth
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary">
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
    </>
  )
}

export default Login;
