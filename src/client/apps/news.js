import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import API from '../api'
import sortNews from '../operations/news-sort'

const NewsBody = styled.main`
    height: 100%;
`

const Article = ({header, body}) => (
  <section>
    <div>{header}</div>
    <div>{body}</div>
  </section>
)

const News = () => {
  const [news, setNews] = useState([])

  useEffect(() => {
    API.getFreshNews()
      .then(setNews)
  }, [])

  return (<NewsBody>
    {sortNews(news)
      .map(({id, header, body}) => (
      <Article
          key={id}
          header={header}
          body={body}
      />
      ))
    }
  </NewsBody>)
}

export default News