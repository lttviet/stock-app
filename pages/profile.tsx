import { Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material'
import { doc } from 'firebase/firestore'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useFirestore, useFirestoreDocData, useUser } from 'reactfire'
import History from '../components/history'
import Layout from '../components/layout'
import PortfolioTable from '../components/portfolioTable'
import useRequireAuth from '../hooks/useRequireAuth'

const WrappedProfile: NextPage = () => {
  const signedIn = useRequireAuth('/login')

  if (!signedIn) return <LinearProgress />
  return <Profile />
}

// TODO refactor
const Profile: NextPage = () => {
  const [value, setValue] = useState(0)
  const [cash, setCash] = useState(0)
  const [logs, setLogs] = useState<string[]>([])

  const { data: user } = useUser()
  const userRef = doc(useFirestore(), `users/${user?.uid}`)
  const { status, data } = useFirestoreDocData(userRef)

  useEffect(() => {
    if (status === 'success') {
      setValue(data.value || 0)
      setCash(data.cash || 0)
      setLogs(data.history || [])
    }
  }, [status, data])

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
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h6">
                  Portfolio Value
                </Typography>
                <Typography variant="h4">
                  {status === 'loading' && 'Loading...'}
                  {status === 'success' && (value / 100).toFixed(2)}
                  {status === 'error' && 'Failed to connect.'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} lg={6}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h6">
                  Cash
                </Typography>
                <Typography variant="h4">
                  {status === 'loading' && 'Loading...'}
                  {status === 'success' && (cash / 100).toFixed(2)}
                  {status === 'error' && 'Failed to connect.'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid
          container item
          spacing={2}
        >
          <Grid item xs={12} sm={12} lg={6}>
            <PortfolioTable />
          </Grid>

          <Grid item xs={12} sm={12} lg={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  History
                </Typography>
                <History logs={logs} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default WrappedProfile
