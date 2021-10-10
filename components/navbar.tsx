import { ShowChart } from '@mui/icons-material'
import { AppBar, Box, Button, Toolbar } from '@mui/material'
import { useSigninCheck } from 'reactfire'
import { signout } from '../lib/firebase'
import Link from './link'

const Navbar = () => {
  const { data: signInCheckResult } = useSigninCheck()

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button
            size="large"
            startIcon={<ShowChart />}
            component={Link}
            href="/"
          >
            Stock Game
          </Button>
        </Box>

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
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
