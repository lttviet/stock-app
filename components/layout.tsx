import { Autocomplete, Box, TextField, Toolbar } from '@mui/material'
import { tickers } from '../lib/tickers'
import Navbar from './navbar'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar />

      <Box component="main" sx={{ p: 3, overflow: "hidden" }}>
        <Toolbar />
        {children}
      </Box>
    </>
  )
}

export default Layout
