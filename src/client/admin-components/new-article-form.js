import React, { useState } from 'react'
import styled from 'styled-components'
import translate from '../translate-component'


const ArticleFormWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 2fr;
  grid-template-areas:
    "header button"
    "body body";
  row-gap: 5px;
  column-gap: 15px;
  max-width: 900px;
`

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
       style={{gridArea:'header'}}
    />
    <button 
      onClick={performSave} 
      style={{gridArea:'button'}}
    >
      {t(`admin.news.button.create`)}
    </button>
    <textarea 
      name={t('admin.news.input.body')}
      id='news-body'
      onChange={updateBody}
      value={bodyValue}
      style={{gridArea:'body'}}
    />
  </ArticleFormWrapper>)
}

export default translate(NewArticleForm)