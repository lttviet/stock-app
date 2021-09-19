import ShowChartIcon from '@mui/icons-material/ShowChart'
import { AppBar, Button, Grid, Toolbar } from '@mui/material'
import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '../styles/Layout.module.css'

const Layout: NextPage = ({ children }) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>

          <Grid container>
            <Grid item>
              <Link href="/" passHref>
                <Button size="large" startIcon={<ShowChartIcon />}>
                  Stock Game
                </Button>
              </Link>
            </Grid>
          </Grid>

          <Link href="/profile" passHref>
            <Button color="inherit" variant='outlined'>Profile</Button>
          </Link>
          <Link href="/login" passHref>
            <Button color="inherit" variant='outlined'>Login</Button>
          </Link>
        </Toolbar>
      </AppBar>

      <div className={styles.container}>
        {children}
      </div>
    </>

  )
}

export default Layout;
