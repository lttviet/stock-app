import SearchIcon from '@mui/icons-material/Search'
import { Autocomplete, Grid, InputAdornment, TextField } from '@mui/material'
import { SyntheticEvent, useState } from 'react'
import SearchResult from './searchResult'

const tickers = [
  'AAPL', 'AA', 'GME', 'TSLA', 'MSFT', 'FB'
]

const Search = () => {
  const [symbol, setSymbol] = useState<string | null>(null)
  const [show, setShow] = useState(false)

  const updateSymbol = (_: SyntheticEvent<Element, Event>, newValue: string | null) => {
    setSymbol(newValue)
    setShow(!!newValue)
  }

  return (
    <Grid
      container item
      spacing={2}
    >
      <Grid item xs={12} sm={12} lg={6}>
        <Autocomplete
          value={symbol}
          onChange={updateSymbol}
          options={tickers}
          autoHighlight
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search stock..."
              fullWidth
              InputProps={{
                ...params.InputProps,
                startAdornment:
                  <InputAdornment position="start">
                    <SearchIcon></SearchIcon>
                  </InputAdornment>
              }}
            />
          )}
        />
      </Grid>

      {show && <SearchResult symbol={symbol} />}
    </Grid>
  )
}

export default Search
