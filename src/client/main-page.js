import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import News from './apps/news'
import Status from './apps/status'
import Navigator from './navigator'
import Header from './header'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import { darkTheme, lightTheme } from './colors'
import translate, { Language } from './translate-component'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Venetian 301';
    src: url('./Venetian301BT-Roman.otf');
  }
  body {
    margin: 0;
    height: 100vh;
    font-family: 'Venetian 301';
    font-weight: bold;
    font-size: 1.5em;
    color: ${({ theme }) => theme.font};
    background-color: ${({ theme }) => theme.background};
  }
  #root {
      height: 100%;
  }
`

const StyledMain = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`

const NavigationFooter = styled.footer`
    background-color: ${({ theme }) => theme.red1};
    color: ${({ theme }) => theme.font};
    font-size: 2em;
    padding: 5px 0px;
    text-align: center;
`

const MainPage = ({ t }) => {
    const [hasAppsOpened, setAppsOpened] = useState(false)
    const [language, setLanguage] = useState('ca')
    const [currentTheme, setCurrentTheme] = useState('light')
    const toggleHasAppsOpened = () => setAppsOpened(!hasAppsOpened)
    const toggleTheme = () => setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light')
    return (
        <ThemeProvider theme={currentTheme === 'light' ? lightTheme : darkTheme}>
            <GlobalStyle />
            <Language.Provider value={language}>
                <StyledMain>
                    <Header
                        onLanguageChange={setLanguage}
                        onThemeToggle={toggleTheme}
                    />
                    <Router>
                        <Navigator
                            hidden={!hasAppsOpened}
                            onClick={toggleHasAppsOpened}
                        />
                        <Switch>
                            <Route exact path='/'>/</Route>
                            <Route exact path='/map'>map</Route>
                            <Route exact path='/messenger'>messenger</Route>
                            <Route exact path='/couterie'>couterie</Route>
                            <Route exact path='/news'><News /></Route>
                            <Route exact path='/status'><Status /></Route>
                            <Route exact path='/relationships'>relationships</Route>
                        </Switch>
                    </Router>
                    <NavigationFooter onClick={toggleHasAppsOpened}>{t('main.footer.apps')}</NavigationFooter>
                </StyledMain>
            </Language.Provider>
        </ThemeProvider>
    )
}

export default translate(MainPage)