import React, { useEffect, useState } from 'react'
import MainPage from './pages/main-page'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { darkTheme, lightTheme } from './colors'
import { Language } from './translate-component'
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
  button {
    font-family: 'Venetian 301';
    border: none;
    color: inherit;
    background: none;
    padding: 0
  }
  #root {
      height: 100%;
  }
`

const saveToken = ({token}) => localStorage.setItem('token', token)
const getToken = () => localStorage.getItem('token')
const removeToken = () => localStorage.removeItem('token')

const App = () => {
  const [language, setLanguage] = useState('ca')
  const [currentTheme, setCurrentTheme] = useState('light')
  const [credentials, setCredentials] = useState('checking')

  useEffect(() => {
    API.verifyToken(getToken())
      .then(({verified}) => {
        if(verified){  
          setCredentials('verified')
        }else{
          removeToken()
          setCredentials('none')
        }
      })
  },[])

  const renderPage = credentialStatus => {
    if (credentialStatus === 'none') {
      return (<PasswordPage 
        onPasswordVerification={({token, tokenTTL}) => {
          setCredentials('verified')
          saveToken({token, tokenTTL})
        }}
      />)
    }
    if (credentialStatus === 'verified') {
      return (<MainPage
        onThemeToggle={toggleTheme}
        onLanguageChange={setLanguage}
        currentTheme={currentTheme}
      />)
    }
    if(credentialStatus === 'checking'){
      return 'checking...'
    }
  }

  const toggleTheme = () => setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light')
  return (
    <ThemeProvider theme={currentTheme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Language.Provider value={language}>
        {renderPage(credentials)}
      </Language.Provider>
    </ThemeProvider>
  )
}

export default App