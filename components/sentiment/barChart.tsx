import { AxisBottom, AxisLeft } from '@visx/axis'
import { Group } from '@visx/group'
import { scaleBand, scaleLinear } from '@visx/scale'
import { Bar } from '@visx/shape'
import { useMemo } from 'react'
import { Dimension, SentimentData } from '../../lib/types'

type BarChartProps = { data: SentimentData } & Dimension

type BarData = [string, number]

const purple = '#a44afe'

// accessors
const getLabel = (d: BarData) => d[0]
const getMention = (d: BarData) => d[1]

const BarChart = ({ data, width, height, margin = { top: 20, right: 20, bottom: 50, left: 50 } }: BarChartProps) => {
  const innerWidth = width - margin.right - margin.left
  const innerHeight = height - margin.top - margin.bottom

  const formattedData: BarData[] = useMemo(() => {
    return Object.entries(data)
  }, [data])

  // scales
  const xScale = useMemo(() => {
    return scaleBand<string>({
      range: [0, innerWidth],
      domain: formattedData.map(getLabel),
      padding: 0.3,
    })
  }, [formattedData, innerWidth])

  const yScale = useMemo(() => {
    return scaleLinear<number>({
      range: [innerHeight, 0],
      domain: [0, Math.max(...formattedData.map(getMention))],
      nice: true,
    })
  }, [formattedData, innerHeight])

  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} fill="transparent" rx={14} />
      <Group top={margin.top} left={margin.left}>
        {formattedData.map((d) => {
          const label = getLabel(d)

          const barWidth = xScale.bandwidth()
          const barHeight = innerHeight - (yScale(getMention(d)) ?? 0)

          const barX = xScale(label)
          const barY = innerHeight - barHeight

          return (
            <Bar
              key={label}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill={purple}
            />
          )
        })}

        <AxisLeft
          scale={yScale}
          stroke={purple}
          tickStroke={purple}
          tickLabelProps={() => ({
            fill: purple,
            fontSize: 11,
            textAnchor: 'end',
            dy: '0.33em',
          })}
        />
        <AxisBottom
          top={innerHeight}
          scale={xScale}
          stroke={purple}
          tickStroke={purple}
          tickLabelProps={() => ({
            fill: purple,
            fontSize: 14,
            textAnchor: 'middle',
          })}
        />
      </Group>
    </svg>
  )
}

export default BarChart
