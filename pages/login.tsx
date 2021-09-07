import { TextField, Typography, Grid, Button } from '@material-ui/core'
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

      <Grid
        container
        spacing={3}
        direction="column"
        justifyContent="center"
        alignItems="stretch"
      >
        <Grid item xs={12} sm={4}>
          <Typography variant="h4">Sign in</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Email"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button variant="contained" color="primary">
            Email link
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            Firebase is used for passwordless authentication.
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default Login;
