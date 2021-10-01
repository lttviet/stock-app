import SearchIcon from '@mui/icons-material/Search'
import { Button, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

const Search: NextPage = () => {
  const [price, setPrice] = useState(0)

  useEffect(() => {
    fetch('/api/stock/GME')
      .then(res => res.json())
      .then(
        (res) => {
          setPrice(res.c)
        },
        (e) => {
          console.error(e)
        }
      )
  }, [])

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
        <Grid item>
          <Typography variant="h6">
            GME - ${price}
          </Typography>
        </Grid>

        <Grid item>
          <Button variant="contained">Buy</Button>
        </Grid>

        <Grid item>
          <Button variant="contained" color="error">Sell</Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Search
