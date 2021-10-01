import SearchIcon from '@mui/icons-material/Search'
import { Button, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import type { NextPage } from 'next'
import useQuote from '../hooks/useQuote'

const Search: NextPage = () => {
  const symbol = 'GME'
  const { quote, isLoading, isError } = useQuote(symbol)

  return (
    <Grid
      container item
      spacing={2}
    >
      <Grid item xs={12} sm={12} lg={6}>
        <TextField
          placeholder="Search stock..."
          fullWidth
          InputProps={{
            startAdornment:
              <InputAdornment position="start">
                <SearchIcon></SearchIcon>
              </InputAdornment>
          }}
        />
      </Grid>

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
    </Grid>
  )
}

export default Search
