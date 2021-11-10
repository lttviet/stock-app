import { collection } from 'firebase/firestore'
import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire'

export default function usePortfolio() {
  const { data: user } = useUser()
  const firestore = useFirestore()

  const portfolioRef = collection(firestore, `users/${user?.uid}/portfolio`)
  const { data: portfolio } = useFirestoreCollectionData(
    portfolioRef,
    { idField: 'symbol' },
  )

  return { portfolio }
}
