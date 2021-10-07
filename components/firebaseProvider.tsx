import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { AuthProvider, FirestoreProvider, useFirebaseApp } from 'reactfire';

interface Props {
  children: React.ReactNode
}

const FirebaseProvider = ({ children }: Props) => {
  const app = useFirebaseApp()

  const auth = getAuth(app)
  const firestore = getFirestore(app)

  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestore}>
        {children}
      </FirestoreProvider>
    </AuthProvider>
  )
}

export default FirebaseProvider
