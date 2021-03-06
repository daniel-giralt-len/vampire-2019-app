import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { darkTheme, lightTheme } from './colors'
import { Language } from './translate-component'
import AdminPage from './pages/admin-page'
import MainPage from './pages/main-page'
import PasswordPage from './pages/password-page'
import API from './api'
import {
  saveToken,
  getToken,
  removeToken,
} from './token'

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
  a{
    color: inherit;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
  }
  ul, li {
      list-style: none;
      padding: 0;
      margin: 0;
  }
  button, input, textarea {
    font-family: 'Venetian 301';
    font-size: inherit;
    font-weight: inherit;
    border: none;
    color: inherit;
    background: none;
    padding: 0
  }
  #root {
      height: 100%;
  }
`

const App = () => {
  const [language, setLanguage] = useState('ca')
  const [currentTheme, setCurrentTheme] = useState('light')
  const [credentials, setCredentials] = useState('checking')
  const [token, setToken] = useState(getToken())

  useEffect(() => {
    API.verifyToken(token)
      .then(({ verified }) => {
        if (verified) {
          setCredentials('verified')
          API.getTheme(token)
            .then(({theme}) => setCurrentTheme(theme || 'light'))
        } else {
          removeToken()
          setCredentials('none')
        }
      })
  }, [])

  const renderPlayerPage = (credentialStatus) => {
    if (credentialStatus === 'none') {
      return (<PasswordPage
        onPasswordVerification={({ token }) => {
          setCredentials('verified')
          setToken(token)
          saveToken(token)
        }}
      />)
    }
    if (credentialStatus === 'verified') {
      return (<MainPage
        onThemeToggle={toggleTheme}
        onLanguageChange={setLanguage}
        currentTheme={currentTheme}
        token={token}
      />)
    }
    if (credentialStatus === 'checking') {
      return 'checking...'
    }
  }

  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'
    setCurrentTheme(newTheme)
    API.setTheme({token, theme: newTheme})
  }

  return (
    <ThemeProvider theme={currentTheme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Language.Provider value={language}>
      <Router>
        <Switch>
          <Route exact path='/narrator'><AdminPage/></Route>
          <Route path='/'>{renderPlayerPage(credentials)}</Route>
        </Switch>
      </Router>
      </Language.Provider>
    </ThemeProvider>
  )
}

export default App