import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Stock } from '../lib/types'
import Link from './link'

interface PortfolioTableProps {
  portfolio: Stock[]
}

const PortfolioTable = ({ portfolio }: PortfolioTableProps) => {
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
          {portfolio.map((s) => (
            <TableRow key={s.symbol}>
              <TableCell>
                <Link href={`/stocks/${s.symbol}`}>{s.symbol}</Link>
              </TableCell>
              <TableCell align="right">
                {s.quantity}
              </TableCell>
              <TableCell align="right">
                {(s.averageCost / 100).toFixed(2)}
              </TableCell>
              <TableCell align="right">
                0
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PortfolioTable
