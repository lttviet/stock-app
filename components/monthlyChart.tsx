import { LinearProgress, Typography } from '@mui/material'
import { ParentSize } from '@visx/responsive'
import useCandle from '../hooks/useCandle'
import Chart from './chart'

interface Props {
  ticker: string
}

const MonthlyChart = ({ ticker }: Props) => {
  const { data, loading, error } = useCandle(ticker as string)

  return (
    <>
      {error && <Typography variant="h4">Failed to get data</Typography>}
      {loading && <LinearProgress />}
      <div>
        {!error && !loading && (
          <ParentSize>
            {({ width }) => (
              <Chart data={data} width={width} height={400} />
            )}
          </ParentSize>
        )}
      </div>
    </>
  )
}

export default MonthlyChart
