import { Typography } from "@mui/material"
import { ParentSize } from '@visx/responsive'
import useCandle from '../../hooks/useCandle'
import Chart from './chart'

interface MonthlyChartProps {
  height?: number
  ticker: string
}

const MonthlyChart = ({ height = 400, ticker }: MonthlyChartProps) => {
  const { data } = useCandle(ticker as string)

  if (!data || data.length < 1) {
    return (
      <Typography variant="h4">
        Failed to get data
      </Typography>
    )
  }

  return (
    <ParentSize>
      {({ width }) => (
        <Chart data={data} width={width} height={height} />
      )}
    </ParentSize>
  )
}

export default MonthlyChart
