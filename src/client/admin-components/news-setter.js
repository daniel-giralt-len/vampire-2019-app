import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import translate from '../translate-component'
import API from '../api'

const ArticleFormWrapper = styled.div``

const UntranslatedArticleForm = ({
  header, 
  body, 
  archived, 
  articleId,
  t, 
  onSave,
  buttonLabel
}) => {
  const [headerValue, setHeader] = useState(header)
  const [bodyValue, setBody] = useState(body)
  const [archivedValue, setArchived] = useState(archived)

  const updateHeader = e => setHeader(e.target.value)
  const updateBody = e => setBody(e.target.value)
  const updateArchived = e => setArchived(e.target.checked)

  const performSave = () => onSave({
    articleId,
    header: headerValue,
    body: bodyValue,
    archived: archivedValue
  })

  return (<ArticleFormWrapper>
    <input type='text'
       name={t('admin.news.input.header')}
       id='news-header'
       onChange={updateHeader}
       value={headerValue}
    />
    <input type='checkbox' 
      name={t('admin.news.input.archived')}
      id='news-archived'
      onChange={updateArchived}
      checked={archivedValue}
    />
    <label htmlFor='news-archived'>{t('admin.news.archived')}</label>
    <textarea 
      name={t('admin.news.input.body')}
      id='news-body'
      onChange={updateBody}
      value={bodyValue}
    />
    <button onClick={performSave} >{t(`admin.news.button.${buttonLabel}`)}</button>
  </ArticleFormWrapper>)
}

const ArticleForm = translate(UntranslatedArticleForm)

const NewsSetter = ({t}) => {
  const [news, setNews] = useState([])

  useEffect(() => {
    API.getNews()
      .then(setNews)
  }, [])

  return (<div>
    <ArticleForm onSave={API.addNewsArticle} />

    </div>)
}

export default translate(NewsSetter)