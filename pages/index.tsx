import { Link, List, ListItem, ListItemText, Typography } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'

const Home: NextPage = () => {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [articles, setArticles] = useState(
    [{ id: 123, title: 'Test', url: 'none' }]
  )

  useEffect(() => {
    fetch('https://api.spaceflightnewsapi.net/v3/articles')
      .then(res => res.json())
      .then(
        (res) => {
          setIsLoaded(true)
          setError(null)
          setArticles(res)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        })
  }, [])

  return (
    <>
      <Head>
        <title>Stock Game</title>
      </Head>

      <Typography variant="h4">
        Welcome to the new app.
        Enjoy your stay.
        Currently WIP.
      </Typography>

      {!isLoaded &&
        <Typography variant="h4">Loading...</Typography>
      }

      <List>
        {
          articles.map((article) => (
            <ListItem key={article.id}>
              <ListItemText
                primary={article.title}
                secondary={<Link href={article.url}>{article.url}</Link>}
              />
            </ListItem>
          ))
        }
      </List>
    </>
  )
}

export default Home
