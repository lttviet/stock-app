import { LinearProgress, Typography } from "@mui/material"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from "next"
import Chart from "../../components/chart"
import Layout from "../../components/layout"
import useCandle from "../../hooks/useCandle"
import { tickers } from "../../lib/tickers"
import { ParentSize } from '@visx/responsive'

export const getStaticProps: GetStaticProps = async (context) => {
  return { props: { ticker: context.params?.ticker } }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = tickers.map(
    (ticker) => ({
      params: { ticker: ticker.toLowerCase() }
    })
  )

  return { paths, fallback: false }
}

const Stock: NextPage = ({ ticker }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data, loading, error } = useCandle(ticker)

  return (
    <Layout>
      {loading && <LinearProgress />}
      {error && <Typography variant="h4">Failed to get data</Typography>}
      {!loading && !error &&
        <ParentSize>
          {({ width }) => (
            <Chart data={data} width={width} height={400} />
          )}
        </ParentSize>
      }
    </Layout>
  )
}

export default Stock
