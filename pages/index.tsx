import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Stock Game</title>
      </Head>

      <Typography variant="h4">
        Welcome to the new app.
        Enjoy your stay.
        Currently WIP.
      </Typography>
    </>
  )
}

export default Home
