import SearchIcon from '@mui/icons-material/Search'
import { Autocomplete, InputAdornment, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import { SyntheticEvent, useState } from 'react'
import { tickers } from '../../lib/tickers'

const Search = () => {
  const [symbol, setSymbol] = useState<string | null>(null)

  const router = useRouter()

  const updateSymbol = (_: SyntheticEvent<Element, Event>, newValue: string | null) => {
    setSymbol(newValue)
    if (newValue) router.push(`/stocks/${newValue}`)
  }

  const prefecthHighlight = (_: SyntheticEvent<Element, Event>, option: string | null) => {
    if (option) router.prefetch(`/stocks/${option}`)
  }

  return (
    <Autocomplete
      value={symbol}
      onChange={updateSymbol}
      options={tickers}
      autoHighlight
      onHighlightChange={prefecthHighlight}
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
  )
}

export default Search
