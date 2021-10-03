import ShowChartIcon from '@mui/icons-material/ShowChart'
import { AppBar, Box, Button, Grid, Toolbar } from '@mui/material'
import type { NextPage } from 'next'
import Link from './Link'

const Layout: NextPage = ({ children }) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Grid container>
            <Grid item>
              <Button
                size="large"
                startIcon={<ShowChartIcon />}
                component={Link}
                href="/"
              >
                Stock Game
              </Button>
            </Grid>
          </Grid>

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
      </AppBar>

      <Box sx={{ margin: '1em' }}>
        {children}
      </Box>
    </>

  )
}

export default Layout;
