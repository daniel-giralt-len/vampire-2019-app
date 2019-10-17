import React, { Fragment, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import News from './apps/news'
import Navigator from './navigator'
import styled from 'styled-components'
import colors from './colors'

const StyledRouter = styled(Router)`
    height: 100%;
`

const NavigationOpener = styled.footer`
    background-color: ${colors.red1};
    color: ${colors.white1};
    padding: 5px 0px;
    text-align: center;
`

const MainPage = () => {
    const [hasAppsOpened, setAppsOpened] = useState(false)
    const toggleHasAppsOpened = () => setAppsOpened(!hasAppsOpened)
    return (
        <StyledRouter>
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
                    <Route exact path='/news'><News/></Route>
                    <Route exact path='/status'>status</Route>
                    <Route exact path='/relationships'>relationships</Route>
                </Switch>
            </Router>
            <NavigationOpener onClick={toggleHasAppsOpened}>APPS</NavigationOpener>
        </StyledRouter>)
}

export default MainPage