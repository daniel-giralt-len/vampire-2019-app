import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import MainPage from './main-page'
import { createGlobalStyle } from 'styled-components'

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
  }
  #root {
      height: 100%;
  }
`

ReactDOM.render((<Fragment>
    <GlobalStyle />
    <MainPage />
</Fragment>), document.querySelector('#root'))