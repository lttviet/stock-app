import { LinearProgress, Typography } from "@mui/material"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from "next"
import Chart from "../../components/chart"
import Layout from "../../components/layout"
import useCandle from "../../hooks/useCandle"
import { tickers } from "../../lib/tickers"

export const getStaticProps: GetStaticProps = async (context) => {
  return { props: { ticker: context.params?.ticker } }
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  const upperCasePaths = tickers.map(
    (ticker) => ({
      params: { ticker }
    }))

  const lowerCasePaths = tickers.map(
    (ticker) => ({
      params: { ticker: ticker.toLowerCase() }
    })
  )

  return { paths: [...upperCasePaths, ...lowerCasePaths], fallback: false }
}

const Stock: NextPage = ({ ticker }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data, loading, error } = useCandle(ticker)

  return (
    <Layout>
      {loading && <LinearProgress />}
      {error && <Typography variant="h4">Failed to get data</Typography>}
      {!loading && !error && data &&
        <Chart data={data} width={800} height={400} />
      }
    </Layout>
  )
}

export default Stock
