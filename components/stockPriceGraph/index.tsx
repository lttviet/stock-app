import { LinearProgress, Typography } from '@mui/material'
import { ParentSize } from '@visx/responsive'
import useCandle from '../../hooks/useCandle'
import Chart from './chart'

interface MonthlyChartProps {
  height?: number,
  ticker: string,
}

const MonthlyChart = ({ height = 400, ticker }: MonthlyChartProps) => {
  const { data, loading, error } = useCandle(ticker as string)

  return (
    <>
      {error && <Typography variant="h4">Failed to get data</Typography>}
      {loading && <LinearProgress />}
      <div>
        {!error && !loading && (
          <ParentSize>
            {({ width }) => (
              <Chart data={data} width={width} height={height} />
            )}
          </ParentSize>
        )}
      </div>
    </>
  )
}

export default MonthlyChart
