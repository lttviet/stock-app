import { doc } from 'firebase/firestore'
import { useFirestore, useFirestoreDocData, useUser } from 'reactfire'

export default function useUserData() {
  const firestore = useFirestore()

  const { data: user } = useUser()
  const userRef = doc(firestore, `users/${user?.uid}`)
  const { status, data } = useFirestoreDocData(userRef, { idField: 'id' })

  if (status === 'success') return { data }
  return { data: null }
}
