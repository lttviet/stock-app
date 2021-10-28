import { Card, CardContent, LinearProgress, Typography } from '@mui/material'

type CardWithNumberProps = {
  status: 'loading' | 'success' | 'error',
  header: string,
  number: number,
}

const CardWithNumber = ({ status, header, number }: CardWithNumberProps) => (
  <Card>
    <CardContent>
      <Typography gutterBottom variant="h6">
        {header}
      </Typography>
      <Typography variant="h4">
        {status === 'loading' && <LinearProgress />}
        {status === 'success' && (number / 100).toFixed(2)}
        {status === 'error' && 'Failed to connect.'}
      </Typography>
    </CardContent>
  </Card>
)

export default CardWithNumber
