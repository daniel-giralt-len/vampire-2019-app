import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import Cog from './svgs/cog'
import translate, { availableLanguages, Language } from './translate-component'

const StyledHeader = styled.header`
    background-color: ${({theme}) => theme.blue1};
    color: ${({theme}) => theme.white1};
    padding: 10px 0px;
    font-size: 2em;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
`

const ConfigMenu = styled.div`
  background-color: ${({theme}) => theme.background};
  color: ${({theme}) => theme.font};
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  right: 0;
  width: 50%;
`

const LanguageButton = styled.button`
  font-size: 1em;
  margin-right: 5px;
`
const Toggle = styled.button`
  font-size: 1em;
`

const Header = ({ onThemeToggle, onLanguageChange, t }) => {
  const [isConfigOpen, setConfig] = useState(false)
  const toggleConfigMenu = () => setConfig(!isConfigOpen)
  const language = useContext(Language)
  const theme = 0//useContext(Theme)
  return (
    <div>
      <StyledHeader>
        <div>Rainy</div>
        <div>13:52</div>
        <div onClick={toggleConfigMenu} ><Cog width='1.2em' height='1.2em' /></div>
      </StyledHeader>
      {isConfigOpen && <ConfigMenu>
        <div>
          {
            availableLanguages
              .map(lang => (<LanguageButton
                key={lang}
                disabled={lang === language}
                onClick={() => onLanguageChange(lang)}
              >
                {t(`header.${lang}`)}
              </LanguageButton>))
          }
        </div>
        <Toggle onClick={onThemeToggle}>
          {theme === 'light' ? t('header.dark') : t('header.light')}
        </Toggle>
      </ConfigMenu>}
    </div>)
}

export default translate(Header)