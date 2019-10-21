import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import News from './apps/news'
import Status from './apps/status'
import Couterie from './apps/couterie'
import Navigator from './navigator'
import Header from './header'
import styled from 'styled-components'
import translate from './translate-component'

const StyledLayout = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`

const NavigationFooter = styled.footer`
    background-color: ${({ theme }) => theme.red1};
    color: ${({ theme }) => theme.white1};
    font-size: 2em;
    padding: 5px 0px;
    text-align: center;
`

const StyledContent = styled.main`
    flex-grow: 1;
    overflow-y: scroll;
    padding: 3vh 3vw 0.5vh 3vw;
`

const MainPage = ({ currentTheme, onThemeToggle, onLanguageChange, t }) => {
    const [hasAppsOpened, setAppsOpened] = useState(false)

    const toggleHasAppsOpened = () => setAppsOpened(!hasAppsOpened)
    return (
        <StyledLayout>
            <Header
                onLanguageChange={onLanguageChange}
                onThemeToggle={onThemeToggle}
                theme={currentTheme}
            />
            <Router>
                <Navigator
                    hidden={!hasAppsOpened}
                    onClick={toggleHasAppsOpened}
                    onCloseApps={toggleHasAppsOpened}
                />
                <Switch>
                    <StyledContent>
                    <Route exact path='/'>/</Route>
                    <Route exact path='/map'>map</Route>
                    <Route exact path='/messenger'>messenger</Route>
                    <Route exact path='/couterie'><Couterie /></Route>
                    <Route exact path='/news'><News /></Route>
                    <Route exact path='/status'><Status /></Route>
                    <Route exact path='/relationships'>relationships</Route>
                    </StyledContent>
                </Switch>
            </Router>
            <NavigationFooter onClick={toggleHasAppsOpened}>
                {t('main.footer.apps')}
            </NavigationFooter>
        </StyledLayout>
    )
}

export default translate(MainPage)