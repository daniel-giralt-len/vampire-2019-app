import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import translate from '../translate-component'
import NewArticleForm from './new-article-form'
import ArticleForm from './article-form'
import API from '../api'

const sortById = (a,b) => {
  if(a.id > b.id) return 1
  if(a.id < b.id) return -1
  return 0
}

const NewsSetter = ({t}) => {
  const [news, setNews] = useState([])

  useEffect(() => {
    API.getNews()
      .then(setNews)
  }, [])

  const createNewArticle = ({header, body, archived}) => {
    API.addNewsArticle({header, body, archived})
      .then(({articleId}) => setNews([
        ...news,
        { header, body, archived, id: articleId }
      ]))
  }

  const updateArticle = ({id, key, value}) => {
    const newNews = [...news]
    const article = news.find(article => article.id === id)
    
    console.log(id,key,value,article)
    if(!article){ return }
    
    article[key] = value
    setNews(newNews)
  }

  const saveArticles = () => API.updateNewsArticles(news)

  const onHeaderChange = (id, value) => updateArticle({id, key: 'header', value})
  const onBodyChange = (id, value) => updateArticle({id, key: 'body', value})
  const onArchivedChange = (id, value) => updateArticle({id, key: 'archived', value})

  return (<div>
    <NewArticleForm onSave={createNewArticle} />
    <button onClick={saveArticles}>
      {t('admin.news.button.update')}
    </button>
    {news.sort(sortById).reverse().map(({id, header, body, archived}) => (
      <ArticleForm 
        key={id}
        articleId={id}
        header={header}
        body={body}
        archived={archived}
        onHeaderChange={onHeaderChange}
        onBodyChange={onBodyChange}
        onArchivedChange={onArchivedChange}
      />
    ))}
    </div>)
}

export default translate(NewsSetter)