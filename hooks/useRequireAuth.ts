import { useRouter } from "next/router"
import { useEffect } from "react"
import { useSigninCheck } from "reactfire"

function useRequireAuth(redirectUrl = '/login') {
  const { status, data: signInCheckResult } = useSigninCheck()
  const router = useRouter()

  useEffect(() => {
    if (status !== 'loading' && !signInCheckResult?.signedIn)
      router.push(redirectUrl)
  }, [status, signInCheckResult, router])

  return signInCheckResult?.signedIn
}

export default useRequireAuth
