import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import News from './apps/news'
import Navigator from './navigator'

const MainPage = () => {
    return (
        <Router>
            <Navigator/>
            <Switch>
                <Route exact path='/'>/</Route>
                <Route exact path='/map'>map</Route>
                <Route exact path='/messenger'>messenger</Route>
                <Route exact path='/couterie'>couterie</Route>
                <Route exact path='/weather'>weather</Route>
                <Route exact path='/news'><News/></Route>
                <Route exact path='/status'>status</Route>
                <Route exact path='/relationships'>relationships</Route>
            </Switch>
        </Router>)
}

export default MainPage