import SearchIcon from '@mui/icons-material/Search'
import { Autocomplete, InputAdornment, TextField } from '@mui/material'
import { SyntheticEvent } from 'react'

interface Props {
  value: string | null,
  onChange: (event: SyntheticEvent<Element, Event>, value: string | null) => void,
  options: string[]
}

const SearchInput = ({ value, onChange, options }: Props) => {
  return (
    <Autocomplete
      value={value}
      onChange={onChange}
      options={options}
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
  )
}

export default SearchInput
