// only allow these tickers for the time being
export const tickers = [
  'AAPL', 'AA', 'GME', 'TSLA', 'MSFT', 'FB'
]

export const isValid = (ticker: string) => {
  return ticker !== '' && tickers.includes(ticker.toUpperCase())
}
