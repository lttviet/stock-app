import { Grid, Typography, CircularProgress } from '@mui/material'
import { doc } from 'firebase/firestore'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useFirestore, useFirestoreDoc, useUser } from 'reactfire'

const NewUser: NextPage = () => {
  const router = useRouter()

  const { data: user } = useUser()

  const firestore = useFirestore()
  const userDetailsRef = doc(firestore, `users/${user?.uid}`)
  const { data } = useFirestoreDoc(userDetailsRef)

  useEffect(() => {
    // wait for cloud function to finish setting up data
    data.exists()
      ? router.push('/profile')
      : router.prefetch('/profile')
  }, [data, router])

  return (
    <Grid
      container
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Grid item paddingBottom={3}>
        <Typography variant="h4">
          Setting up your data for first login.
        </Typography>
      </Grid>

      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  )
}

export default NewUser
