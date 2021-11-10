import { Typography } from '@mui/material'
import { Quote } from '../hooks/useSocket'

interface PriceProps {
  ticker: string
  quote: Quote
}

const Price = ({ ticker, quote }: PriceProps) => {
  if (!ticker) return null

  return (
    <Typography variant="h4">
      ${ticker} - {quote.symbol === ticker && ` $${quote.price}`}
    </Typography>
  )
}

export default Price
