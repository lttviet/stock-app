import { Typography } from "@mui/material"
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next"
import Chart from "../../components/chart"
import Layout from "../../components/layout"
import { tickers } from "../../lib/tickers"
import { getTimestamp } from "../../lib/utils"

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { ticker } = context.query

  if (!ticker) {
    return { props: { error: 'Missing ticker' } }
  }

  if (Array.isArray(ticker)) {
    return { props: { error: 'Bad formatted ticker' } }
  }

  if (!tickers.includes(ticker.toUpperCase())) {
    return { props: { error: 'Ticker is not in approved list' } }
  }

  const date = new Date()
  const today = getTimestamp(date)

  date.setMonth(date.getMonth() - 1)
  const oneMonthAgo = getTimestamp(date)

  try {
    const url = `${process.env.FINNHUB_CANDLE_API_URL}&symbol=${ticker.toUpperCase()}&resolution=D&from=${oneMonthAgo}&to=${today}`
    const response = await fetch(url)
    const jsonData = await response.json()

    if (!jsonData) {
      return { props: { error: 'Failed to get data' } }
    }

    const formattedData = jsonData.c.map(
      (price: number, index: number) => (
        { close: price, date: jsonData.t[index] }
      )
    )

    return { props: { data: formattedData } }
  } catch (e: any) {
    console.error(e.message)
    return { props: { error: 'Failed to get data' } }
  }
}

const Stock: NextPage = ({ error, data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout>
      {error && <Typography variant="h4">{error}</Typography>}
      {!error && data &&
        <Chart data={data} width={800} height={400} />
      }
    </Layout>
  )
}

export default Stock
