import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useSigninCheck } from "reactfire"

function useRequireSignedIn(redirectUrl = '/login') {
  const [show, setShow] = useState(false)

  const router = useRouter()
  const { status, data: signInCheckResult } = useSigninCheck()

  useEffect(() => {
    setShow(status === 'success' && signInCheckResult?.signedIn)

    if (status !== 'loading' && !signInCheckResult?.signedIn) {
      router.push(redirectUrl)
    }
  }, [status, signInCheckResult, router, redirectUrl])

  return { show }
}

export default useRequireSignedIn
