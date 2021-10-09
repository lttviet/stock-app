import { Grid } from '@mui/material'
import { SyntheticEvent, useState } from 'react'
import SearchInput from './searchInput'
import SearchResult from './searchResult'

const tickers = [
  'AAPL', 'AA', 'GME', 'TSLA', 'MSFT', 'FB'
]

const Search = () => {
  const [symbol, setSymbol] = useState<string | null>(null)

  const updateSymbol = (_: SyntheticEvent<Element, Event>, newValue: string | null) => {
    setSymbol(newValue)
  }

  return (
    <Grid container item spacing={2}>
      <Grid item xs={12} sm={12} lg={6}>
        <SearchInput value={symbol} options={tickers} onChange={updateSymbol} />
      </Grid>

      {!!symbol &&
        <Grid container item xs={12} sm={12} lg={6} spacing={1} alignItems="center">
          <SearchResult symbol={symbol} />
        </Grid>
      }
    </Grid>
  )
}

export default Search
