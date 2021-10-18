import { Box, Button, Grid, LinearProgress, Typography } from "@mui/material"
import { addDoc, collection, doc, query, setDoc, where } from 'firebase/firestore'
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useFirestore, useFirestoreCollectionData, useFirestoreDocData, useSigninCheck, useUser } from 'reactfire'
import Layout from "../../components/layout"
import MonthlyChart from "../../components/monthlyChart"
import Price from "../../components/price"
import Sentiment from "../../components/sentiment"
import useSocket from "../../hooks/useSocket"
import { tickers } from "../../lib/tickers"

// refactor
const Stock: NextPage = () => {
  const router = useRouter()
  const ticker = router.query.ticker as string

  const firestore = useFirestore()

  const { data: signInCheckResult } = useSigninCheck()

  const { data: user } = useUser()
  const userRef = doc(firestore, `users/${user?.uid}`)
  const { data } = useFirestoreDocData(userRef, { idField: 'id' })

  const stocksCollectionRef = collection(firestore, `users/${user?.uid}/stocks`)
  const stocksQuery = query(stocksCollectionRef, where('symbol', '==', ticker))
  const { data: stocksQueryData } = useFirestoreCollectionData(stocksQuery, { idField: 'id' })

  const { quote, loading, error } = useSocket(ticker)

  const buy = () => {
    const price = quote.price

    if (data.cash < price * 100) {
      return
    }

    // set cash
    const newCash = data.cash - price * 100
    setDoc(userRef, { cash: newCash }, { merge: true })

    if (stocksQueryData.length === 0) {
      // new stock
      addDoc(stocksCollectionRef, {
        symbol: ticker,
        quantity: 1,
        cost: price * 100,
      })
    } else {
      const stockDoc = stocksQueryData[0]
      const stockDocRef = doc(firestore, `users/${user?.uid}/stocks`, stockDoc.id)
      setDoc(stockDocRef,
        {
          quantity: stockDoc.quantity + 1,
          cost: stockDoc.cost + price * 100,
        },
        { merge: true }
      )
    }
  }

  const sell = () => {
    const price = quote.price

    const newCash = data.cash + price * 100
    setDoc(userRef, { cash: newCash }, { merge: true })

    const stockDoc = stocksQueryData[0]
    const stockDocRef = doc(firestore, `users/${user?.uid}/stocks`, stockDoc.id)
    setDoc(stockDocRef,
      {
        quantity: stockDoc.quantity - 1,
        cost: stockDoc.cost - price * 100,
      },
      { merge: true }
    )
  }

  if (!tickers.includes(ticker)) {
    return (
      <Layout>
        <Typography variant="h4">
          404 Page Not Found. TODO: custom 404 page.
        </Typography>
      </Layout>
    )
  }

  return (
    <Layout>
      <MonthlyChart height={400} ticker={ticker} />

      <div>
        <Typography variant="body1">
          Reddit weekly mentions:
        </Typography>

        <Box component={Grid} item xs={12} sm={9} md={4}>
          <Sentiment height={400} ticker={ticker} />
        </Box>
      </div>

      {data && (
        <Typography variant="body1">Cash: ${(data.cash / 100).toFixed(2)}</Typography>
      )}

      {stocksQueryData && stocksQueryData.length === 1 && (
        <>
          <Typography variant="body1">Your shares: {stocksQueryData[0].quantity || 0}</Typography>
          <Typography variant="body1">Average cost: ${(stocksQueryData[0].cost / (stocksQueryData[0].quantity * 100)).toFixed(2) || 0}</Typography>
        </>
      )}

      {loading && <LinearProgress />}
      {error && <Typography variant="h4">Failed to get data</Typography>}

      {!loading && !error && signInCheckResult?.signedIn && (
        <>
          <Price ticker={ticker} quote={quote} />
          <Button variant="contained" onClick={buy}>Buy</Button>
          <Button variant="contained" onClick={sell}>Sell</Button>
        </>
      )}
    </Layout>
  )
}

export default Stock
