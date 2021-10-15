import { localPoint } from "@visx/event"
import { scaleLinear, scaleTime } from "@visx/scale"
import { Bar, Circle, Line, LinePath } from '@visx/shape'
import { Tooltip, useTooltip } from "@visx/tooltip"
import { bisector, extent } from 'd3-array'
import { curveMonotoneX } from "d3-shape"
import { timeFormat } from 'd3-time-format'
import React, { useCallback, useMemo } from "react"
import { StockData } from "../lib/types"

interface ChartProps {
  data: StockData[],
  width: number,
  height: number,
  margin?: { top: number, right: number, bottom: number, left: number }
}

const formatDate = timeFormat("%b %d, '%y")

// accessors
const getDate = (d: StockData) => new Date(d.date)
const getStockValue = (d: StockData) => d.close
const bisectDate = bisector<StockData, Date>((d) => new Date(d.date)).left

const Chart = (
  { data,
    width,
    height,
    margin = { top: 0, right: 0, bottom: 0, left: 0 },
  }: ChartProps) => {
  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop = 0,
    tooltipLeft = 0
  } = useTooltip<StockData>()

  const colour =
    data.length > 1 && data[0].close >= data[data.length - 1].close
      ? 'red'
      : 'green'

  // bounds
  const innerWidth = width - margin.right - margin.left
  const innerHeight = height - margin.top - margin.bottom

  // scales
  const dateScale = useMemo(
    () =>
      scaleTime({
        range: [margin.left, innerWidth + margin.left],
        domain: extent(data, getDate) as [Date, Date],
      }),
    [innerWidth, margin.left, data])

  const stockValueScale = useMemo(
    () =>
      scaleLinear({
        range: [innerHeight + margin.top, margin.top],
        domain: extent(data, getStockValue) as [number, number],
        nice: true
      }),
    [innerHeight, margin.top, data])

  // tooltip
  const handleTooltip = useCallback(
    (event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
      const { x } = localPoint(event) || { x: 0 }
      const x0 = dateScale.invert(x)
      const index = bisectDate(data, x0, 1)
      const d0 = data[index - 1]
      const d1 = data[index]
      let d = d0
      if (d1 && getDate(d1)) {
        d = x0.valueOf() - getDate(d0).valueOf() > getDate(d1).valueOf() - x0.valueOf()
          ? d1
          : d0
      }
      showTooltip({
        tooltipData: d,
        tooltipLeft: x,
        tooltipTop: stockValueScale(getStockValue(d))
      })
    }, [dateScale, data, showTooltip, stockValueScale]
  )

  return (
    <div style={{ position: "relative" }}>
      <svg width={width} height={height}>
        <rect x={0} y={0}
          width={width} height={height}
          rx={14}
          fill="transparent"
        />
        <LinePath<StockData>
          data={data}
          x={(d) => dateScale(getDate(d)) ?? 0}
          y={(d) => stockValueScale(getStockValue(d)) ?? 0}
          strokeWidth={2}
          stroke={colour}
          curve={curveMonotoneX}
        />
        <Bar
          x={margin.left}
          y={margin.top}
          width={innerWidth}
          height={innerHeight}
          fill="transparent"
          rx={14}
          onTouchStart={handleTooltip}
          onTouchMove={handleTooltip}
          onMouseMove={handleTooltip}
          onMouseLeave={() => hideTooltip()}
        />

        {tooltipData && (
          <g>
            <Line
              from={{ x: tooltipLeft, y: margin.top }}
              to={{ x: tooltipLeft, y: innerHeight + margin.top }}
              stroke="grey"
              strokeWidth={1}
              pointerEvents="none"
            />
            <Circle
              cx={tooltipLeft}
              cy={tooltipTop}
              r={4}
              fill={colour}
              stroke={colour}
              strokeWidth={2}
              pointerEvents="none"
            />
          </g>
        )}
      </svg>
      {tooltipData && (
        <div>
          <Tooltip
            top={tooltipTop}
            left={tooltipLeft}
          >
            {getStockValue(tooltipData)}
          </Tooltip>
          <Tooltip
            top={margin.top}
            left={tooltipLeft}
          >
            {formatDate(getDate(tooltipData))}
          </Tooltip>
        </div>
      )}
    </div>
  )
}

export default Chart
