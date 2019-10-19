import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import News from './apps/news'
import Status from './apps/status'
import Navigator from './navigator'
import Header from './header'
import styled from 'styled-components'
import colors from './colors'
import translate, { Language } from './translate-component'

const StyledMain = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`

const NavigationFooter = styled.footer`
    background-color: ${colors.red1};
    color: ${colors.white1};
    font-size: 2em;
    padding: 5px 0px;
    text-align: center;
`

const MainPage = ({t}) => {
    const [hasAppsOpened, setAppsOpened] = useState(false)
    const [language] = useState('ca')
    const toggleHasAppsOpened = () => setAppsOpened(!hasAppsOpened)
    return (
        <Language.Provider value={language}>
            <StyledMain>
                <Header/>
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
    )
}

export default translate(MainPage)