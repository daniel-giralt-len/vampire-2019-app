import React from 'react'
import styled from 'styled-components'
import translate from '../translate-component'

const ArticleFormWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 2fr;
  grid-template-areas:
    "header archived"
    "body body";
  row-gap: 5px;
  column-gap: 15px;
  max-width: 900px;
`

const ArchivedWrapper = styled.div`
  display: flex;
  align-items: center;
`

const ArticleForm = ({
  header, 
  body, 
  archived, 
  articleId,
  t, 
  onHeaderChange,
  onBodyChange,
  onArchivedChange,
  className
}) => {

  return (<ArticleFormWrapper className={className}>
    <input type='text'
       name={t('admin.news.input.header')}
       id='news-header'
       onChange={e => onHeaderChange(articleId, e.target.value)}
       value={header}
       style={{gridArea:'header'}}
    />
    <ArchivedWrapper style={{gridArea:'archived'}}>
      <input type='checkbox' 
        name={t('admin.news.input.archived')}
        id='news-archived'
        onChange={e => onArchivedChange(articleId, e.target.checked)}
        checked={archived}
      />
      <label htmlFor='news-archived'>{t('admin.news.archived')}</label>
    </ArchivedWrapper>
    <textarea 
      name={t('admin.news.input.body')}
      id='news-body'
      value={body}
      onChange={e => onBodyChange(articleId, e.target.value)}
      style={{gridArea:'body'}}
    />
  </ArticleFormWrapper>)
}

export default translate(ArticleForm)