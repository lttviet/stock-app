import { Grid, LinearProgress } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Suspense } from 'react'
import Layout from '../components/layout'
import PortfolioTable from '../components/portfolioTable'
import CashCard from '../components/profile/cashCard'
import History from '../components/profile/history'
import PortfolioValueCard from '../components/profile/portfolioValueCard'
import useRequireSignedIn from '../hooks/useRequireSignedIn'

const WrappedProfile: NextPage = () => {
  const { show } = useRequireSignedIn('/login')

  if (!show) return <LinearProgress />
  return <Profile />
}

const Profile: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Profile</title>
      </Head>

      <Grid
        container
        direction="column"
        spacing={4}>

        <Grid
          container item
          spacing={2}
        >
          <Grid item xs={12} sm={12} lg={6}>
            <PortfolioValueCard />
          </Grid>

          <Grid item xs={12} sm={12} lg={6}>
            <Suspense fallback={<LinearProgress />}>
              <CashCard />
            </Suspense>
          </Grid>
        </Grid>

        <Grid
          container item
          spacing={2}
        >
          <Grid item xs={12}>
            <Suspense fallback={<LinearProgress />}>
              <PortfolioTable />
            </Suspense>
          </Grid>

          <Grid item xs={12}>
            <History />
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default WrappedProfile
