import { httpsCallable } from "@firebase/functions"
import { Box, Button, CircularProgress, Grid, LinearProgress, Typography } from "@mui/material"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from "next"
import { Suspense } from "react"
import { useFunctions, useSigninCheck } from 'reactfire'
import Layout from "../../components/layout"
import Price from "../../components/price"
import CashCard from "../../components/profile/cashCard"
import Sentiment from "../../components/sentiment"
import MonthlyChart from "../../components/stockPriceGraph"
import useSocket from "../../hooks/useSocket"
import { tickers } from "../../lib/tickers"

interface SignedInDataProps {
  ticker: string
}

// TODO refactor
const SignedInData = ({ ticker }: SignedInDataProps) => {
  const { quote, loading, error } = useSocket(ticker)

  const functions = useFunctions()
  const buyStockFunction = httpsCallable<{ ticker: string, price: number }, undefined>(
    functions,
    'buyStock',
  )
  const sellStockFunction = httpsCallable<{ ticker: string, price: number }, undefined>(
    functions,
    'sellStock',
  )

  const buy = async () => {
    try {
      await buyStockFunction({ ticker, price: Math.floor(quote.price * 100) })
    } catch (e: any) {
      console.error(e.message)
    }
  }

  const sell = async () => {
    try {
      await sellStockFunction({ ticker, price: Math.floor(quote.price * 100) })
    } catch (e: any) {
      console.error(e.message)
    }
  }

  return (
    <>
      <Suspense fallback={<LinearProgress />}>
        <CashCard />
      </Suspense>

      {loading && <LinearProgress />}
      {error && <Typography variant="h4">Failed to get data</Typography>}

      {!loading && !error && (
        <Price ticker={ticker} quote={quote} />
      )}

      <Button variant="contained" onClick={buy}>Buy</Button>

      <Button variant="contained" onClick={sell}>Sell</Button>
    </>
  )
}

// refactor
const Stock: NextPage = ({ ticker }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: signInCheckResult } = useSigninCheck()

  return (
    <Layout>
      <Suspense fallback={<LinearProgress />}>
        <MonthlyChart height={400} ticker={ticker} />
      </Suspense>

      <div>
        <Typography variant="body1">
          Reddit weekly mentions:
        </Typography>

        <Box component={Grid} item xs={12} sm={9} md={4}>
          <Suspense fallback={<CircularProgress />}>
            <Sentiment height={400} ticker={ticker} />
          </Suspense>
        </Box>
      </div>

      {signInCheckResult.signedIn && <SignedInData ticker={ticker} />}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return { props: { ticker: params?.ticker as string } }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = tickers.map((ticker) => ({
    params: { ticker }
  }))

  return {
    paths,
    fallback: false,
  }
}

export default Stock
