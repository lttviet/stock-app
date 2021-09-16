import { createTheme, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import Layout from '../components/layout';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  const theme = createTheme({
    palette: {
      type: 'dark'
    }
  })

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  )
}
export default MyApp
