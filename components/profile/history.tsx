import { Card, CardContent, LinearProgress, List, ListItem, ListItemText, Typography } from '@mui/material'
import { SuspenseWithPerf } from 'reactfire'
import useUserDetails from '../../hooks/useUserDetails'

const LogList = () => {
  const { userDetails } = useUserDetails()

  const logs = userDetails.history as string[] || []

  return (
    <List>
      {
        logs.map((log) => (
          <ListItem key={log}>
            <ListItemText primary={log} />
          </ListItem>
        ))
      }
    </List >
  )
}

const History = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">
          History
        </Typography>

        <SuspenseWithPerf
          fallback={<LinearProgress />}
          traceId="load-firestore-user-doc"
        >
          <LogList />
        </SuspenseWithPerf>
      </CardContent>
    </Card>
  )
}

export default History
