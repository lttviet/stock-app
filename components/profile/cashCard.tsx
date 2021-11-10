import useUserDetails from '../../hooks/useUserDetails'
import NumberCard from './numberCard'

const CashCard = () => {
  const { userDetails } = useUserDetails()

  return (
    <NumberCard
      header="Cash"
      number={userDetails.cash}
    />
  )
}

export default CashCard
