import { Button, Grid, Typography } from '@mui/material'
import useSocket from '../hooks/useSocket'

interface Props {
  symbol: string | null
}

const SearchResult = ({ symbol }: Props) => {
  const { quote, loading, error } = useSocket(symbol)

  if (!symbol) return null

  return (
    <Grid
      container item
      xs={12} sm={12} lg={6}
      spacing={1}
      alignItems="center"
    >
      {loading &&
        <Grid item>
          <Typography variant="h6">Loading...</Typography>
        </Grid>
      }

      {error &&
        <Grid item>
          <Typography variant="h6">Failed to get price.</Typography>
        </Grid>
      }

      {!loading && !error &&
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
      }

    </Grid>
  )
}

export default SearchResult
