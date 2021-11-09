import { httpsCallable } from "@firebase/functions"
import { Box, Button, Grid, LinearProgress, Typography } from "@mui/material"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from "next"
import { useFunctions, useSigninCheck } from 'reactfire'
import Layout from "../../components/layout"
import Price from "../../components/price"
import Sentiment from "../../components/sentiment"
import MonthlyChart from "../../components/stockPriceGraph"
import useSocket from "../../hooks/useSocket"
import useUserData from "../../hooks/useUserData"
import useUserStock from "../../hooks/useUserStock"
import { tickers } from "../../lib/tickers"

interface SignedInDataProps {
  ticker: string
}

// TODO refactor
const SignedInData = ({ ticker }: SignedInDataProps) => {
  const { data: userData } = useUserData()
  const { data: userStockData } = useUserStock(ticker)
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
    await buyStockFunction({ ticker, price: quote.price })
  }

  const sell = async () => {
    await sellStockFunction({ ticker, price: quote.price })
  }

  return (
    <>
      {userData && (
        <Typography variant="body1">Cash: ${(userData.cash / 100).toFixed(2)}</Typography>
      )}

      {userStockData && (
        <>
          <Typography variant="body1">Your shares: {userStockData.quantity || 0}</Typography>
          <Typography variant="body1">Average cost: ${(userStockData.cost / (userStockData.quantity * 100)).toFixed(2) || 0}</Typography>
        </>
      )}

      {loading && <LinearProgress />}
      {error && <Typography variant="h4">Failed to get data</Typography>}

      {!loading && !error && (
        <>
          <Price ticker={ticker} quote={quote} />
        </>
      )}

      <Button variant="contained" onClick={buy}>Buy</Button>

      <Button variant="contained" onClick={sell}>Sell</Button>
    </>
  )
}

// refactor
const Stock: NextPage = (
  { ticker }: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const { data: signInCheckResult } = useSigninCheck()

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

      {signInCheckResult?.signedIn && <SignedInData ticker={ticker} />}
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
