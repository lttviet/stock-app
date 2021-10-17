import { Box, Grid, Typography } from "@mui/material"
import { NextPage } from "next"
import { useRouter } from "next/router"
import Layout from "../../components/layout"
import MonthlyChart from "../../components/monthlyChart"
import Sentiment from "../../components/sentiment"
import { tickers } from "../../lib/tickers"

const Stock: NextPage = () => {
  const router = useRouter()
  const ticker = router.query.ticker as string

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

      <>
        <Typography variant="h4">{ticker}</Typography>
        <Typography variant="body1">
          Reddit weekly mentions:
        </Typography>

        <Box component={Grid} xs={12} sm={9} md={4}>
          <Sentiment height={400} ticker={ticker} />
        </Box>
      </>
    </Layout>
  )
}

export default Stock
