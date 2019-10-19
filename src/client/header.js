import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import colors from './colors'
import translate, { Language } from './translate-component'

const StyledHeader = styled.header`
    background-color: ${colors.blue1};
    color: ${colors.white1};
    padding: 7px 0px;
    font-size: 2em;
    display: flex;
    justify-content: space-around;
    align-items: center;
`

const Header = ({ onLanguageChange, t }) => {
  const [isLanguageListOpen, setLanguageList] = useState(false)
  const toggleLanguageList = () => setLanguageList(!isLanguageListOpen)
  const language = useContext(Language)
  return (<StyledHeader>
    <div>Rainy</div>
    <div>13:52</div>
    <div onClick={toggleLanguageList}>{t(`header.${language}`)}</div>
  </StyledHeader>)
}

export default translate(Header)