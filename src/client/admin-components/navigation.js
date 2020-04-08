import React, { useState, useEffect } from 'react'
import translate from '../translate-component'
import styled from 'styled-components'

const StyledHeader = styled.div`
  background-color: ${({ theme }) => theme.red1};
  color: ${({ theme }) => theme.white1};
  padding: 10px 0px;
  font-size: 2em;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
`

const Anchor = styled.a`
  :hover {
    color: ${({ theme }) => theme.grey1};
  }
  :active {
    color: ${({ theme }) => theme.black1};
  }
`

const Navigation = ({t, theme}) => {
  return (
      <StyledHeader>
        <Anchor href='#map'>{t('navigator.map')}</Anchor>
        <Anchor href='#messenger'>{t('navigator.messenger')}</Anchor>
        <Anchor href='#couterie'>{t('navigator.couterie')}</Anchor>
        <Anchor href='#news'>{t('navigator.news')}</Anchor>
        <Anchor href='#status'>{t('navigator.status')}</Anchor>
        <Anchor href='#relationships'>{t('navigator.bonds')}</Anchor>
      </StyledHeader>
  )
}

export default translate(Navigation)