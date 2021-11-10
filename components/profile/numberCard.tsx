import { Card, CardContent, Typography } from '@mui/material'

type NumberCardProps = {
  header: string
  number: number
}

const NumberCard = ({ header, number }: NumberCardProps) => {
  const formattedNumber = (number / 100).toFixed(2)

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h6">
          {header}
        </Typography>
        <Typography variant="h4">
          {formattedNumber}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default NumberCard
