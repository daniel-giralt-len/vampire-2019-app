import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import colors from './colors'

const StyledNavigator = styled.div`
`


const Header = styled.header`
    background-color: ${colors.red1};
    color: ${colors.white1};
    padding: 5px 0px;
    text-align: center
`

const Apps = styled.ul`
    display: grid;
    grid-template-columns: repeat(3,1fr);
    text-align: center;
    margin: 0;
    padding: 0;
    list-style: none;
`

const StyledAppLink = styled.li`
`

const AppLink = ({ svg, link, name, onClick }) => {
    return (<Fragment>
        <Link
            onClick={onClick}
            to={link}
        >
            {name}
        </Link>
    </Fragment>)
}

const Navigator = () => {
    const [hasAppsOpened, setAppsOpened] = useState(true)

    const apps = [
        '/map',
        '/messenger',
        '/couterie',
        '/weather',
        '/news',
        '/status',
        '/relationships',
    ]

    const toggleHasAppsOpened = () => setAppsOpened(!hasAppsOpened)
    return (
        <StyledNavigator>
            <Header onClick={toggleHasAppsOpened}>APPS</Header>
            {hasAppsOpened && (<Apps>
                {apps.map(appLink => (
                    <AppLink
                        key={appLink}
                        link={appLink}
                        name={appLink}
                        onClick={toggleHasAppsOpened}
                    />
                ))}
            </Apps>)}
        </StyledNavigator>
    )
}

export default Navigator