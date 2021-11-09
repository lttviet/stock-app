import { getFunctions } from '@firebase/functions';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { AuthProvider, FirestoreProvider, FunctionsProvider, useFirebaseApp } from 'reactfire';

interface Props {
  children: React.ReactNode
}

const FirebaseProvider = ({ children }: Props) => {
  const app = useFirebaseApp()

  const auth = getAuth(app)
  const firestore = getFirestore(app)
  const functions = getFunctions(app)

  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestore}>
        <FunctionsProvider sdk={functions}>
          {children}
        </FunctionsProvider>
      </FirestoreProvider>
    </AuthProvider>
  )
}

export default FirebaseProvider
