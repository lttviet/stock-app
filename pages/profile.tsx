import { Card, CardContent, Grid, Typography } from '@material-ui/core'
import type { NextPage } from 'next'

const Profile: NextPage = () => {
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
    </>
  )
}

export default Profile
