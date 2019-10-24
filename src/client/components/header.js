import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import Cog from '../svgs/cog'
import translate, { availableLanguages, Language } from '../translate-component'

const StyledHeader = styled.header`
    background-color: ${({ theme }) => theme.red1};
    color: ${({ theme }) => theme.white1};
    padding: 10px 0px;
    font-size: 2em;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
`

const ConfigMenu = styled.div`
  background-color: ${({ theme }) => theme.blue1};
  color: ${({ theme }) => theme.white1};
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  right: 0;
  font-size: 2em;
  min-width: 250px;
  box-shadow: -2px 2px 4px black;
  z-index: 1;
`

const LanguageButton = styled.button`
  font-size: 1em;
  margin-right: 5px;
  color: ${({ theme }) => theme.white1};
  &:disabled{
    color: ${({ theme }) => theme.grey1};
  }
`
const Toggle = styled.button`
  margin-top: 1em;
  font-size: 1em;
  color: ${({ theme }) => theme.background};
  background-color: ${({ theme }) => theme.font};
`

const SvgContainer = styled.div`display:flex;`

const Header = ({ onThemeToggle, onLanguageChange, t, theme }) => {
  const [isConfigOpen, setConfig] = useState(false)
  const toggleConfigMenu = () => setConfig(!isConfigOpen)
  const language = useContext(Language)
  return (
    <div>
      <StyledHeader>
        <div>Rainy</div>
        <div>13:52</div>
        <SvgContainer onClick={toggleConfigMenu} ><Cog width='1.2em' height='1.2em' /></SvgContainer>
      </StyledHeader>
      {isConfigOpen && <ConfigMenu>
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
        <Toggle onClick={onThemeToggle}>
          {theme === 'light' ? t('header.dark') : t('header.light')}
        </Toggle>
      </ConfigMenu>
      }
    </div>)
}

export default translate(Header)