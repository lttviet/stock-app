import { Button } from '@mui/material'
import { useAuth, useSigninCheck } from 'reactfire'
import Link from '../link'

const AuthSection = () => {
  const { data: signInCheckResult } = useSigninCheck()
  const auth = useAuth()

  if (signInCheckResult.signedIn) {
    return (
      <>
        <Button variant="outlined" component={Link} href="/profile">
          Profile
        </Button>

        <Button variant="outlined" onClick={() => auth.signOut()}>
          Sign out
        </Button>
      </>
    )
  }

  return (
    <Button variant="outlined" component={Link} href="/login">
      Sign in
    </Button>
  )
}


export default AuthSection
