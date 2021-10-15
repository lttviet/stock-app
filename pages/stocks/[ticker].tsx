import { LinearProgress, Typography } from "@mui/material"
import { ParentSize } from '@visx/responsive'
import { NextPage } from "next"
import { useRouter } from "next/router"
import Chart from "../../components/chart"
import Layout from "../../components/layout"
import useCandle from "../../hooks/useCandle"
import { tickers } from "../../lib/tickers"

const Stock: NextPage = () => {
  const router = useRouter()
  const ticker = router.query.ticker as string
  const { data, loading, error } = useCandle(ticker as string)

  if (!tickers.includes(ticker)) {
    return (
      <Layout>
        <Typography variant="h4">
          404 Page Not Found. TODO: custom 404 page.
        </Typography>
      </Layout>
    )
  }

  if (loading) {
    return (
      <Layout>
        <LinearProgress />
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <Typography variant="h4">Failed to get data</Typography>
      </Layout>
    )
  }

  return (
    <Layout>
      <div>
        <ParentSize>
          {({ width }) => (
            <Chart data={data} width={width} height={400} />
          )}
        </ParentSize>
      </div>
    </Layout>
  )
}

export default Stock
