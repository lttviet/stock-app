import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '../styles/Layout.module.css'

const Layout: NextPage = ({ children }) => {
  return (
    <>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Link href="/" passHref>
            <Typography variant="h6" className={styles.title}>
              Stock Game
            </Typography>
          </Link>

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
