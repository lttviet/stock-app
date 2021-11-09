export interface StockData {
  close: number,
  date: number,
}

export interface SentimentData {
  positive: number,
  negative: number,
}

export interface Stock {
  symbol: string,
  quantity: number,
  averageCost: number,
}
