import NumberCard from './numberCard'

const PortfolioValueCard = () => {
  // TODO calculate value = qty * currentPrice
  const value = 12345

  return (
    <NumberCard
      header="Portfolio Value (WIP)"
      number={value}
    />
  )
}

export default PortfolioValueCard
