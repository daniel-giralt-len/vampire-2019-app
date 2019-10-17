import React from 'react'
import GroupSvg from './svgs/group'
import NewspaperSvg from './svgs/newspaper'
import PersonSvg from './svgs/person'
import RelationshipsSvg from './svgs/relationships'
import SpeechBubleSvg from './svgs/speech-bubble'
import WorldMapSvg from './svgs/world-map'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import colors from './colors'

const Apps = styled.ul`
    position:fixed;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2,1fr);
    margin: 0;
    padding: 20px 0;
    list-style: none;
    transform: translateY(${({ hidden }) => hidden ? '-100%' : '0%'});
    transition: transform 0.5s;
    backdrop-filter: blur(2px);
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
    margin: 5px 0;
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
                    <Svg width={35} height={35} />
                </AppSvg>
                {name}
            </StyledAppLink>
        </li>)
}

const apps = [
    { name: 'Map', Svg: WorldMapSvg, link: '/map' },
    { name: 'Messenger', Svg: SpeechBubleSvg, link: '/messenger' },
    { name: 'Couterie', Svg: GroupSvg, link: '/couterie' },
    { name: 'News', Svg: NewspaperSvg, link: '/news' },
    { name: 'Status', Svg: PersonSvg, link: '/status' },
    { name: 'Relationships', Svg: RelationshipsSvg, link: '/relationships' },
]

const Navigator = ({ hidden, onClick }) => {
    return (
        <Apps hidden={hidden}>
            {apps.map(({ name, Svg, link }) => (
                <AppLink
                    key={name}
                    link={link}
                    name={name}
                    Svg={Svg}
                    onClick={onClick}
                />
            ))}
        </Apps>
    )
}

export default Navigator