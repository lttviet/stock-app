import { LinearProgress, Typography } from "@mui/material"
import { ParentSize } from '@visx/responsive'
import { NextPage } from "next"
import { useRouter } from "next/router"
import Chart from "../../components/chart"
import Layout from "../../components/layout"
import useCandle from "../../hooks/useCandle"
import useSentiment from "../../hooks/useSentiment"
import { tickers } from "../../lib/tickers"

// refactor
// pie chart
const Stock: NextPage = () => {
  const router = useRouter()
  const ticker = router.query.ticker as string

  const {
    data: candleData,
    loading: candleLoading,
    error: candleError,
  } = useCandle(ticker as string)

  const {
    data: sentimentData,
    loading: sentimentLoading,
    error: sentimentError,
  } = useSentiment(ticker as string)

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
      {candleError && <Typography variant="h4">Failed to get data</Typography>}
      {candleLoading && <LinearProgress />}
      <div>
        {!candleError && !candleLoading && (
          <ParentSize>
            {({ width }) => (
              <Chart data={candleData} width={width} height={400} />
            )}
          </ParentSize>
        )}
      </div>

      <div>
        <Typography variant="h4">{ticker}</Typography>
        {sentimentError && <Typography variant="h4">Failed to get data</Typography>}
        {sentimentLoading && <LinearProgress />}
        {sentimentData && (
          <Typography variant="body1">
            Reddit weekly mention: {sentimentData.mention} -
            - Positive: {sentimentData.positiveMention} -
            - Negative: {sentimentData.negativeMention}
          </Typography>
        )}
      </div>
    </Layout>
  )
}

export default Stock
