import React, { Fragment, useState } from 'react'
import GroupSvg from './svgs/group'
import HamburgerSvg from './svgs/hamburger'
import NewspaperSvg from './svgs/newspaper'
import PersonSvg from './svgs/person'
import RelationshipsSvg from './svgs/relationships'
import SpeechBubleSvg from './svgs/speech-bubble'
import WorldMapSvg from './svgs/world-map'
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
    grid-template-columns: repeat(2,1fr);
    text-align: center;
    margin: 0;
    padding: 0;
    list-style: none;
`

const StyledAppLink = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: ${colors.black1};
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`

const AppSvg = styled.div`
    width: 50px;
    height: 50px;
    background-color: ${colors.black1};
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const AppLink = ({ Svg, link, name, onClick }) => {
    return (
        <li>
            <StyledAppLink
                onClick={onClick}
                to={link}
            >
                <AppSvg>
                    <Svg width={35} height={35}/>
                </AppSvg>
                {name}
            </StyledAppLink>
        </li>)
}

const Navigator = () => {
    const [hasAppsOpened, setAppsOpened] = useState(true)

    const apps = [
        {name:'Map', Svg: WorldMapSvg, link: '/map'},
        {name:'Messenger', Svg: SpeechBubleSvg, link: '/messenger'},
        {name:'Couterie', Svg: GroupSvg, link: '/couterie'},
        {name:'News', Svg: NewspaperSvg, link: '/news'},
        {name:'Status', Svg: PersonSvg, link: '/status'},
        {name:'Relationships', Svg: RelationshipsSvg, link: '/relationships'},
    ]

    const toggleHasAppsOpened = () => setAppsOpened(!hasAppsOpened)
    return (
        <StyledNavigator>
            <Header onClick={toggleHasAppsOpened}>APPS</Header>
            {hasAppsOpened && (<Apps>
                {apps.map(({name, Svg, link}) => (
                    <AppLink
                        key={name}
                        link={link}
                        name={name}
                        Svg={Svg}
                        onClick={toggleHasAppsOpened}
                    />
                ))}
            </Apps>)}
        </StyledNavigator>
    )
}

export default Navigator