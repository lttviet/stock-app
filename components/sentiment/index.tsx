import { LinearProgress, Typography } from "@mui/material"
import { ParentSize } from '@visx/responsive'
import useSentiment from '../../hooks/useSentiment'
import BarChart from "./barChart"

interface SentimentProps {
  height?: number
  ticker: string
}

const Sentiment = ({ height = 400, ticker }: SentimentProps) => {
  const { data, loading, error } = useSentiment(ticker as string)

  return (
    <>
      {error && <Typography variant="h4">Failed to get data</Typography>}
      {loading && <LinearProgress />}
      {data && (
        <ParentSize>
          {({ width }) => (
            <BarChart data={data} width={width} height={height} />
          )}
        </ParentSize>
      )}
    </>
  )
}

export default Sentiment
