import { Box, Grid, LinearProgress, Typography } from "@mui/material"
import { ParentSize } from '@visx/responsive'
import useSentiment from '../hooks/useSentiment'
import BarChart from "./barChart"

interface Props {
  ticker: string
}

const Sentiment = ({ ticker }: Props) => {
  const { data, loading, error } = useSentiment(ticker as string)

  return (
    <>
      {error && <Typography variant="h4">Failed to get data</Typography>}
      {loading && <LinearProgress />}
      {data && (
        <>
          <Box component={Grid} xs={12} sm={9} md={4}>
            <ParentSize>
              {({ width }) => (
                <BarChart data={data} width={width} height={400} />
              )}
            </ParentSize>
          </Box>
        </>
      )}
    </>
  )
}

export default Sentiment
