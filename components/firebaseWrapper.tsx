import { initializeAppCheck, ReCaptchaV3Provider } from '@firebase/app-check'
import { getAuth } from '@firebase/auth'
import { getFirestore } from '@firebase/firestore'
import { getFunctions } from '@firebase/functions'
import { getPerformance } from '@firebase/performance'
import { AppCheckProvider, AuthProvider, FirestoreProvider, FunctionsProvider, PerformanceProvider, useFirebaseApp, useInitFirestore, useInitPerformance } from 'reactfire'

interface Props {
  children: React.ReactNode
}

const FirebaseWrapper = ({ children }: Props) => {
  // _app.tsx contains `FirebaseAppProvider`
  const app = useFirebaseApp()

  const auth = getAuth(app)
  const firestore = getFirestore(app)
  const functions = getFunctions(app)

  const performance = getPerformance(app)

  const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_APP_CHECK_TOKEN as string),
    isTokenAutoRefreshEnabled: true,
  })

  return (
    <AppCheckProvider sdk={appCheck}>
      <PerformanceProvider sdk={performance}>
        <AuthProvider sdk={auth}>
          <FirestoreProvider sdk={firestore}>
            <FunctionsProvider sdk={functions}>
              {children}
            </FunctionsProvider>
          </FirestoreProvider>
        </AuthProvider>
      </PerformanceProvider>
    </AppCheckProvider>
  )
}

export default FirebaseWrapper
