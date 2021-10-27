import { LinearProgress } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/layout'
import LoginForm from '../components/loginForm'
import useRequireNotSignedIn from '../hooks/useRequireNotSignedIn'

const WrappedLogin: NextPage = () => {
  const { show } = useRequireNotSignedIn('/profile')

  if (!show) return <LinearProgress />
  return <Login />
}

const Login: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>

      <LoginForm />
    </Layout>
  )
}

export default WrappedLogin;
