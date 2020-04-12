import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import API from '../api'
import sortNews from '../operations/news-sort'

const NewsBody = styled.main`
    height: 100%;
`

const ArticleWrapper = styled.section`
  margin-bottom: 20px;
  padding: 5px 10px;
  border-bottom: 1px solid ${({theme}) => theme.grey1}
`

const Article = ({header, body}) => (
  <ArticleWrapper>
    <h1>{header}</h1>
    <div>{body}</div>
  </ArticleWrapper>
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