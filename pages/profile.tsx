import { Card, CardContent, Grid, List, ListItem, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core'
import type { NextPage } from 'next'

const Profile: NextPage = () => {
  const logs: string[] = [
    "Buy AAPL at $1.23",
    "Sell AAPL at $23.33",
    "Test 123..."
  ]

  const stocks = [
    {
      symbol: "AAPL",
      quantity: 23,
      averageCost: 12.11,
      currentPrice: 123.33
    },
    {
      symbol: "GE",
      quantity: 12,
      averageCost: 3,
      currentPrice: 4.5
    }
  ]

  return (
    <>
      <Grid
        container
        spacing={3}
        direction="row"
      >
        <Grid item xs={12} sm={12} lg={6}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h6">
                Portfolio Value
              </Typography>
              <Typography variant="h4">
                $0.00
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={12} lg={6}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h6">
                Cash
              </Typography>
              <Typography variant="h4">
                $0.00
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={3}
        direction="row"
      >
        <Grid item xs={12} sm={12} lg={6}>
          <TextField
            label="Search stock..."
            fullWidth
          />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={3}
        direction="row"
      >
        <Grid item xs={12} sm={12} lg={6}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableCell>Stock</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Average Cost</TableCell>
                <TableCell align="right">Current Price</TableCell>
              </TableHead>

              <TableBody>
                {stocks.map((row) => (
                  <TableRow key={row.symbol}>
                    <TableCell component="th" scope="row">{row.symbol}</TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">{row.averageCost}</TableCell>
                    <TableCell align="right">{row.currentPrice}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={12} sm={12} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                History
              </Typography>
              <List>
                {logs.map((log) => (
                  <ListItem>
                    <ListItemText primary={log} key={log} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default Profile