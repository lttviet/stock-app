import { Card, CardContent, Grid, LinearProgress, List, ListItem, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { doc } from 'firebase/firestore'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useFirestore, useFirestoreDocData, useUser } from 'reactfire'
import Layout from '../components/layout'
import Search from '../components/search'
import useRequireAuth from '../hooks/useRequireAuth'

const logs: string[] = [
  "Buy AAPL at $1.23",
  "Sell AAPL at $23.33",
  "Test 123..."
]

const stocks = [
  {
    symbol: "AAPL",
    quantity: 23,
    averageCost: 12.11,
    currentPrice: 123.33
  },
  {
    symbol: "GE",
    quantity: 12,
    averageCost: 3,
    currentPrice: 4.5
  }
]

const WrappedProfile: NextPage = () => {
  const signedIn = useRequireAuth('/login')

  if (!signedIn) return <LinearProgress />
  return <Profile />
}

// TODO refactor
const Profile: NextPage = () => {
  const [value, setValue] = useState(0)
  const [cash, setCash] = useState(0)

  const { data: user } = useUser()
  const userRef = doc(useFirestore(), `users/${user?.uid}`)
  const { status, data } = useFirestoreDocData(userRef)

  useEffect(() => {
    if (status === 'success') {
      setValue(data.value || 0)
      setCash(data.cash || 0)
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
            <TableContainer component={Paper}>
              <Table>

                <TableHead>
                  <TableRow>
                    <TableCell>Stock</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Average Cost</TableCell>
                    <TableCell align="right">Current Price</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {stocks.map((row) => (
                    <TableRow key={row.symbol}>
                      <TableCell>{row.symbol}</TableCell>
                      <TableCell align="right">{row.quantity}</TableCell>
                      <TableCell align="right">{row.averageCost}</TableCell>
                      <TableCell align="right">{row.currentPrice}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12} sm={12} lg={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  History
                </Typography>
                <List>
                  {logs.map((log) => (
                    <ListItem key={log}>
                      <ListItemText primary={log} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default WrappedProfile
