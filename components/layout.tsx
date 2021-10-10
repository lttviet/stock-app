import { Box, Toolbar } from '@mui/material'
import Navbar from './navbar'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}

export default Layout
