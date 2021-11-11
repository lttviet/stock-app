import { initializeAppCheck, ReCaptchaV3Provider } from '@firebase/app-check'
import { getAuth } from '@firebase/auth'
import { getFirestore } from '@firebase/firestore'
import { getFunctions } from '@firebase/functions'
import { useEffect } from 'react'
import { AppCheckProvider, AuthProvider, FirestoreProvider, FunctionsProvider, useFirebaseApp, useInitAuth } from 'reactfire'

interface Props {
  children: React.ReactNode
}

const FirebaseWrapper = ({ children }: Props) => {
  // _app.tsx contains `FirebaseAppProvider`
  const app = useFirebaseApp()

  const auth = getAuth(app)

  const firestore = getFirestore(app)
  const functions = getFunctions(app)

  const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_APP_CHECK_TOKEN as string),
    isTokenAutoRefreshEnabled: true,
  })

  return (
    <AppCheckProvider sdk={appCheck}>
      <AuthProvider sdk={auth}>
        <FirestoreProvider sdk={firestore}>
          <FunctionsProvider sdk={functions}>
            {children}
          </FunctionsProvider>
        </FirestoreProvider>
      </AuthProvider>
    </AppCheckProvider>
  )
}

export default FirebaseWrapper
