import { Typography } from "@mui/material"
import { ParentSize } from '@visx/responsive'
import useSentiment from '../../hooks/useSentiment'
import BarChart from "./barChart"

interface SentimentProps {
  height?: number
  ticker: string
}

const Sentiment = ({ height = 400, ticker }: SentimentProps) => {
  const { data } = useSentiment(ticker)

  if (!data) {
    return (
      <Typography variant="h4">
        Failed to get data
      </Typography>
    )
  }

  return (
    <ParentSize>
      {({ width }) => (
        <BarChart data={data} width={width} height={height} />
      )}
    </ParentSize>
  )
}

export default Sentiment
