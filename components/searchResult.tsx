import { Button, Grid, Typography } from '@mui/material'
import useQuote from '../hooks/useQuote'

interface Props {
  symbol: string | null
}

const SearchResult = ({ symbol }: Props) => {
  const { quote, isLoading, isError } = useQuote(symbol)

  if (!symbol) return null

  return (
    <Grid
      container item
      xs={12} sm={12} lg={6}
      spacing={1}
      alignItems="center"
    >
      {isLoading &&
        <Grid item>
          <Typography variant="h6">Loading...</Typography>
        </Grid>
      }

      {isError &&
        <Grid item>
          <Typography variant="h6">Failed to get price.</Typography>
        </Grid>
      }

      {!isLoading && !isError &&
        <>
          <Grid item>
            <Typography variant="h6">
              ${symbol} - ${quote.price}
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
