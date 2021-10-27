import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Link from './link'

const stocks = [
  {
    symbol: "AAPL",
    quantity: 23,
    averageCost: 12.11,
    currentPrice: 123.33
  },
  {
    symbol: "TSLA",
    quantity: 12,
    averageCost: 3,
    currentPrice: 4.5
  }
]

const PortfolioTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table>

        <TableHead>
          <TableRow>
            <TableCell>Stock</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Average Cost</TableCell>
            <TableCell align="right">Current Price</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {stocks.map((s) => (
            <TableRow key={s.symbol}>
              <TableCell>
                <Link href={`/stocks/${s.symbol}`}>{s.symbol}</Link>
              </TableCell>
              <TableCell align="right">{s.quantity}</TableCell>
              <TableCell align="right">{s.averageCost}</TableCell>
              <TableCell align="right">{s.currentPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PortfolioTable
