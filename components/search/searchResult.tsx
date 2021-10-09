import { Button, Grid, Typography } from '@mui/material'
import useSocket from '../../hooks/useSocket'

interface Props {
  symbol: string | null
}

const SearchResult = ({ symbol }: Props) => {
  const { quote, loading, error } = useSocket(symbol)

  if (!symbol) return

  if (loading) {
    return (
      <Grid item>
        <Typography variant="h6">Loading...</Typography>
      </Grid>
    )
  }

  if (error) {
    return (
      <Grid item>
        <Typography variant="h6">Failed to get price.</Typography>
      </Grid>
    )
  }

  return (
    <>
      <Grid item>
        <Typography variant="h6">
          ${symbol} - {quote.symbol === symbol && ` $${quote.price}`}
        </Typography>
      </Grid>

      <Grid item>
        <Button variant="contained">Buy</Button>
      </Grid>

      <Grid item>
        <Button variant="contained" color="error">Sell</Button>
      </Grid>
    </>
  )
}

export default SearchResult
