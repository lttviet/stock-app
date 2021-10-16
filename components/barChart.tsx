import { AxisBottom, AxisLeft } from '@visx/axis'
import { Group } from '@visx/group'
import { scaleBand, scaleLinear } from '@visx/scale'
import { Bar } from '@visx/shape'
import { useEffect, useMemo, useState } from 'react'
import { SentimentData } from '../lib/types'

interface BarChart {
  data: SentimentData,
  width: number,
  height: number,
  margin?: { top: number, right: number, bottom: number, left: number }
}

type BarData = [string, number]

const purple = '#a44afe'

// accessors
const getLabel = (d: BarData) => d[0]
const getMention = (d: BarData) => d[1]

const BarChart = (
  {
    data,
    width,
    height,
    margin = { top: 20, right: 20, bottom: 50, left: 50 },
  }: BarChart) => {
  const formattedData: [string, number][] = Object.entries(data)

  const [innerWidth, setInnerWIdth] = useState(0)
  const [innerHeight, setInnerHeight] = useState(0)

  useEffect(() => {
    // bounds
    setInnerWIdth(width - margin.right - margin.left)
    setInnerHeight(height - margin.top - margin.bottom)
  }, [width, height, margin])

  // scales
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, innerWidth],
        domain: formattedData.map(getLabel),
        padding: 0.3,
      }),
    [formattedData, innerWidth]
  )

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [innerHeight, 0],
        domain: [0, Math.max(...formattedData.map(getMention))],
        nice: true,
      }),
    [formattedData, innerHeight],
  )

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
