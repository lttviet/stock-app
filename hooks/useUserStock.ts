import { collection, query, where } from 'firebase/firestore'
import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire'

export default function useUserStock(ticker: string) {
  const firestore = useFirestore()

  const { data: user } = useUser()

  const stocksCollectionRef = collection(firestore, `users/${user?.uid}/stocks`)
  const stocksQuery = query(stocksCollectionRef, where('symbol', '==', ticker))
  const { status, data } = useFirestoreCollectionData(stocksQuery, { idField: 'id' })

  if (status === 'success' && data.length === 1) return { data: data[0] }
  return { data: null }
}
