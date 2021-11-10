import { getFunctions } from 'firebase/functions'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { AuthProvider, FirestoreProvider, FunctionsProvider, SuspenseWithPerf, useFirebaseApp, useInitFirestore } from 'reactfire'
import { LinearProgress } from '@mui/material'

interface Props {
  children: React.ReactNode
}

const FirebaseWrapper = ({ children }: Props) => {
  const app = useFirebaseApp()

  const auth = getAuth(app)
  const firestore = getFirestore(app)
  const functions = getFunctions(app)

  return (
    <SuspenseWithPerf
      fallback={<LinearProgress />}
      traceId="load-firebase-root"
    >
      <AuthProvider sdk={auth}>
        <FirestoreProvider sdk={firestore}>
          <FunctionsProvider sdk={functions}>
            {children}
          </FunctionsProvider>
        </FirestoreProvider>
      </AuthProvider>
    </SuspenseWithPerf>
  )
}

export default FirebaseWrapper
