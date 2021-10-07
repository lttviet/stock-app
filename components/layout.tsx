import { Box } from '@mui/material'
import Navbar from './navbar'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar />

      <Box sx={{ margin: '1em' }}>
        {children}
      </Box>
    </>
  )
}

export default Layout
