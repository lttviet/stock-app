import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <h1>Login</h1>

      <button>Login</button>

      <button>Logout</button>
    </>
  )
}

export default Login;
