import { ShowChart } from '@mui/icons-material'
import { AppBar, Box, Button, Grid, Toolbar } from '@mui/material'
import { useSigninCheck } from 'reactfire'
import { signout } from '../../lib/firebase'
import Link from '../link'
import SearchInput from './searchInput'

const Navbar = () => {
  const { data: signInCheckResult } = useSigninCheck()

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
          {signInCheckResult?.signedIn ? (
            <>
              <Button variant="outlined" component={Link} href="/profile">
                Profile
              </Button>

              <Button variant="outlined" onClick={() => signout()}>
                Sign out
              </Button>
            </>
          ) : (
            <Button variant="outlined" component={Link} href="/login">
              Sign in
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar >
  )
}

export default Navbar