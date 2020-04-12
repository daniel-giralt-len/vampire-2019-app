import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import translate from '../translate-component'

const ArticleFormWrapper = styled.div``

const ArticleForm = ({
  header, 
  body, 
  archived, 
  articleId,
  t, 
  onHeaderChange,
  onBodyChange,
  onArchivedChange,
}) => {

  return (<ArticleFormWrapper>
    <input type='text'
       name={t('admin.news.input.header')}
       id='news-header'
       onChange={e => onHeaderChange(articleId, e.target.value)}
       value={header}
    />
    <input type='checkbox' 
      name={t('admin.news.input.archived')}
      id='news-archived'
      onChange={e => onArchivedChange(articleId, e.target.checked)}
      checked={archived}
    />
    <label htmlFor='news-archived'>{t('admin.news.archived')}</label>
    <textarea 
      name={t('admin.news.input.body')}
      id='news-body'
      onChange={e => onBodyChange(articleId, e.target.value)}
      value={body}
    />
  </ArticleFormWrapper>)
}

export default translate(ArticleForm)