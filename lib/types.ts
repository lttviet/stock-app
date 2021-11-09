export interface StockData {
  close: number
  date: number
}

export interface SentimentData {
  positive: number
  negative: number
}

export interface Stock {
  symbol: string
  quantity: number
  averageCost: number
}

export type Dimension = {
  width: number
  height: number
  margin?: Margin
}

export type Margin = {
  top: number
  right: number
  bottom: number
  left: number
}
