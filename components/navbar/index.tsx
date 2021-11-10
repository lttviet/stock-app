import { ShowChart } from '@mui/icons-material'
import { AppBar, Box, Button, CircularProgress, Grid, Toolbar } from '@mui/material'
import { SuspenseWithPerf } from 'reactfire'
import Link from '../link'
import AuthSection from './authSection'
import SearchInput from './searchInput'

const Navbar = () => {
  return (
    <AppBar position="fixed">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box
          component={Grid}
          item
          display={{ xs: "none", sm: "none", md: "block" }}
        >
          <Button
            size="large"
            startIcon={<ShowChart />}
            component={Link}
            href="/"
          >
            Stock Game
          </Button>
        </Box>

        <Grid item xs={12} sm={12} md={6}>
          <SearchInput />
        </Grid>

        <Box
          component={Grid}
          item
          display={{ xs: "none", sm: "none", md: "block" }}
        >
          <SuspenseWithPerf
            fallback={<CircularProgress />}
            traceId="load-auth"
          >
            <AuthSection />
          </SuspenseWithPerf>
        </Box>
      </Toolbar>
    </AppBar >
  )
}

export default Navbar
