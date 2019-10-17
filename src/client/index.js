import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import MainPage from './main-page'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`

ReactDOM.render((<Fragment>
    <GlobalStyle whiteColor />
    <MainPage /> {/* example of other top-level stuff */}
</Fragment>), document.querySelector('#root'))