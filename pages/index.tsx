import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/layout'

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Stock Game</title>
      </Head>

      <Typography variant="h4">
        Welcome to the new app.
        Enjoy your stay.
        Currently WIP.
      </Typography>
    </Layout>
  )
}

export default Home
