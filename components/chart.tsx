import { scaleLinear, scaleTime } from "@visx/scale";
import { LinePath } from '@visx/shape';
import { extent } from 'd3-array';
import { useMemo } from "react";
import { StockData } from "../lib/types";

interface Props {
  data: StockData[],
  width: number,
  height: number,
  margin?: { top: number, right: number, bottom: number, left: number }
}

// accessors
const getDate = (d: StockData) => new Date(d.date)
const getStockValue = (d: StockData) => d.close

const Chart = (
  { data,
    width,
    height,
    margin = { top: 0, right: 0, bottom: 0, left: 0 }
  }: Props
) => {
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

  return (
    <svg width={width} height={height}>
      <rect x={0} y={0}
        width={width} height={height}
        rx={14}
        fillOpacity={0}
      />
      <LinePath<StockData>
        data={data}
        x={(d) => dateScale(getDate(d)) ?? 0}
        y={(d) => stockValueScale(getStockValue(d)) ?? 0}
        strokeWidth={2}
        stroke={colour}
      />
    </svg>
  )
}

export default Chart
