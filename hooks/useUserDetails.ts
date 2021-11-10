import { doc } from 'firebase/firestore'
import { useFirestore, useFirestoreDocData, useUser } from 'reactfire'

export default function useUserDetails() {
  const { data: user } = useUser()
  const firestore = useFirestore()

  const userDetailsRef = doc(firestore, `users/${user?.uid}`)
  const { data: userDetails } = useFirestoreDocData(userDetailsRef)

  return { userDetails }
}
