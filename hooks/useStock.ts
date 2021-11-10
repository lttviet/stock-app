import { collection, query, where } from 'firebase/firestore'
import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire'
import { Stock } from '../lib/types'

export default function useStock(ticker: string) {
  const { data: user } = useUser()
  const firestore = useFirestore()

  const portfolioRef = collection(firestore, `users/${user?.uid}/stocks`)
  const stockQuery = query(portfolioRef, where('symbol', '==', ticker))
  const { data } = useFirestoreCollectionData(
    stockQuery,
    { idField: 'symbol' }
  )

  return {
    data: data.length === 1 ? data[0] as Stock : undefined
  }
}
