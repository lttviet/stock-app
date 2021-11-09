import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { tickers } from '../../lib/tickers'

const SelectInput = () => {
  const [symbol, setSymbol] = useState('')

  const router = useRouter()

  const updateSymbol = (event: SelectChangeEvent) => {
    const ticker = event.target.value
    setSymbol(ticker)
    if (ticker) router.push(`/stocks/${ticker}`)
  }

  const prefetchHighlight = (ticker: string) => {
    if (ticker) router.prefetch(`/stocks/${ticker}`)
  }

  return (
    <FormControl fullWidth>
      <InputLabel>Stock</InputLabel>
      <Select
        value={symbol}
        onChange={updateSymbol}
        label="Stock"
      >
        {tickers.map((ticker) => (
          <MenuItem
            key={ticker}
            value={ticker}
            onMouseEnter={() => prefetchHighlight(ticker)}
          >
            {ticker}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default SelectInput
