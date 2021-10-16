import { Typography } from "@mui/material"
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
      <MonthlyChart ticker={ticker} />

      <div>
        <Typography variant="h4">{ticker}</Typography>
        <Typography variant="body1">
          Reddit weekly mentions:
        </Typography>
        <Sentiment ticker={ticker} />
      </div>
    </Layout>
  )
}

export default Stock
