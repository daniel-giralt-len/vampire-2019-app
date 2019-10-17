import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

const App = () => {
    return (
        <Router>
            <ul>
                <li><Link to='/map'>map</Link></li>
                <li><Link to='/messenger'>messenger</Link></li>
                <li><Link to='/couterie'>couterie</Link></li>
                <li><Link to='/weather'>weather</Link></li>
                <li><Link to='/news'>news</Link></li>
                <li><Link to='/status'>status</Link></li>
                <li><Link to='/relationships'>relationships</Link></li>
            </ul>
            <Switch>
                <Route exact path='/'>/</Route>
                <Route exact path='/map'>map</Route>
                <Route exact path='/messenger'>messenger</Route>
                <Route exact path='/couterie'>couterie</Route>
                <Route exact path='/weather'>weather</Route>
                <Route exact path='/news'>news</Route>
                <Route exact path='/status'>status</Route>
                <Route exact path='/relationships'>relationships</Route>
            </Switch>
        </Router>)
}

export default App