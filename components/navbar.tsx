import ShowChartIcon from '@mui/icons-material/ShowChart'
import { AppBar, Box, Button, Toolbar } from '@mui/material'
import Link from './link'

const Navbar = () => (
  <AppBar position="static">
    <Toolbar>
      <Box sx={{ flexGrow: 1 }}>
        <Button
          size="large"
          startIcon={<ShowChartIcon />}
          component={Link}
          href="/"
        >
          Stock Game
        </Button>
      </Box>

      <Button
        variant="outlined"
        component={Link}
        href="/profile"
      >
        Profile
      </Button>
      <Button
        variant="outlined"
        component={Link}
        href="/login"
      >
        Login
      </Button>
    </Toolbar>
  </AppBar >
)

export default Navbar
