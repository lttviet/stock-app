import { Box, Button, Grid, LinearProgress, Tooltip, Typography } from "@mui/material"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useSigninCheck } from 'reactfire'
import Layout from "../../components/layout"
import MonthlyChart from "../../components/monthlyChart"
import Price from "../../components/price"
import Sentiment from "../../components/sentiment"
import useSocket from "../../hooks/useSocket"
import useUserData from "../../hooks/useUserData"
import useUserStock from "../../hooks/useUserStock"
import { tickers } from "../../lib/tickers"

interface SignedInDataProps {
  ticker: string
}

const SignedInData = ({ ticker }: SignedInDataProps) => {
  const { data: userData } = useUserData()
  const { data: userStockData } = useUserStock(ticker)

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
    </>
  )
}

// refactor
const Stock: NextPage = () => {
  const router = useRouter()
  const ticker = typeof router.query.ticker === 'string'
    ? router.query.ticker
    : ''

  const { data: signInCheckResult } = useSigninCheck()
  const { quote, loading, error } = useSocket(ticker)

  const buy = () => {
    // TODO implement
    return
  }

  const sell = () => {
    // TODO implement
    return
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

      {signInCheckResult?.signedIn && <SignedInData ticker={ticker} />}

      {loading && <LinearProgress />}
      {error && <Typography variant="h4">Failed to get data</Typography>}

      {!loading && !error && (
        <>
          <Price ticker={ticker} quote={quote} />
        </>
      )}

      <Tooltip title="not working" arrow>
        <Button variant="contained" onClick={buy}>Buy</Button>
      </Tooltip>

      <Tooltip title="not working" arrow>
        <Button variant="contained" onClick={sell}>Sell</Button>
      </Tooltip>
    </Layout>
  )
}

export default Stock
