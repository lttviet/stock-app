import { Button } from '@mui/material'
import { useSigninCheck } from 'reactfire'
import { signout } from '../../lib/firebase'
import Link from '../link'

const AuthSection = () => {
  const { data: signInCheckResult } = useSigninCheck()

  if (signInCheckResult.signedIn) {
    return (
      <>
        <Button variant="outlined" component={Link} href="/profile">
          Profile
        </Button>

        <Button variant="outlined" onClick={() => signout()}>
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
