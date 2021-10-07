import createCache from '@emotion/cache'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { createTheme, CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import type { AppProps } from 'next/app'
import { FirebaseAppProvider } from 'reactfire'
import FirebaseProvider from '../components/firebaseProvider'
import firebaseApp from '../lib/firebase'

// https://github.com/mui-org/material-ui/blob/master/examples/nextjs-with-typescript/pages/_app.tsx
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createCache({ key: 'css' })

const theme = createTheme({
  palette: {
    mode: 'dark'
  }
})

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const MyApp = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <FirebaseAppProvider firebaseApp={firebaseApp}>
          <FirebaseProvider>
            <Component {...pageProps} />
          </FirebaseProvider>
        </FirebaseAppProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
