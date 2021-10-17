import { List, ListItem, ListItemText } from '@mui/material'

type HistoryProps = {
  logs: string[]
}

const History = ({ logs }: HistoryProps) => {
  return (
    <List>
      {logs.map((log) => (
        <ListItem key={log}>
          <ListItemText primary={log} />
        </ListItem>
      ))
      }
    </List>
  )
}

export default History
