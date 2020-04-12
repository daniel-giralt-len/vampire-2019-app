import React, { useState } from 'react'
import styled from 'styled-components'
import translate from '../translate-component'

const ArticleFormWrapper = styled.div``

const NewArticleForm = ({
  t, 
  onSave,
}) => {
  const [headerValue, setHeader] = useState('')
  const [bodyValue, setBody] = useState('')
  const archivedValue = false

  const updateHeader = e => setHeader(e.target.value)
  const updateBody = e => setBody(e.target.value)

  const performSave = () => {
    onSave({
      articleId,
      header: headerValue,
      body: bodyValue,
      archived: archivedValue
    })
    setHeader('')
    setBody('')
  }

  return (<ArticleFormWrapper>
    <input type='text'
       name={t('admin.news.input.header')}
       id='news-header'
       onChange={updateHeader}
       value={headerValue}
    />
    <button onClick={performSave} >{t(`admin.news.button.create`)}</button>
    <textarea 
      name={t('admin.news.input.body')}
      id='news-body'
      onChange={updateBody}
      value={bodyValue}
    />
  </ArticleFormWrapper>)
}

export default translate(NewArticleForm)