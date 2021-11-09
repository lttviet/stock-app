import { Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material'
import { collection, doc, query } from 'firebase/firestore'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useFirestore, useFirestoreCollectionData, useFirestoreDocData, useUser } from 'reactfire'
import CardWithNumber from '../components/cardWithNumber'
import History from '../components/history'
import Layout from '../components/layout'
import PortfolioTable from '../components/portfolioTable'
import useRequireSignedIn from '../hooks/useRequireSignedIn'
import { Stock } from '../lib/types'

const WrappedProfile: NextPage = () => {
  const { show } = useRequireSignedIn('/login')

  if (!show) return <LinearProgress />
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

  const portfolioRef = collection(useFirestore(), `users/${user?.uid}/portfolio`)
  const { status: portfolioStatus, data: portfolio } = useFirestoreCollectionData(
    query(portfolioRef),
    { idField: 'symbol' }
  )

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
            <CardWithNumber
              status={status}
              header="Portfolio Value"
              number={value}
            />
          </Grid>

          <Grid item xs={12} sm={12} lg={6}>
            <CardWithNumber
              status={status}
              header="Cash"
              number={cash}
            />
          </Grid>
        </Grid>

        <Grid
          container item
          spacing={2}
        >
          <Grid item xs={12}>
            {portfolioStatus === 'loading' && <LinearProgress />}
            {portfolioStatus === 'error' && 'Failed to get'}
            {portfolioStatus === 'success' &&
              <PortfolioTable portfolio={portfolio as Stock[]} />
            }

          </Grid>

          <Grid item xs={12}>
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
