import React from 'react'
import GroupSvg from './svgs/group'
import NewspaperSvg from './svgs/newspaper'
import PersonSvg from './svgs/person'
import RelationshipsSvg from './svgs/relationships'
import SpeechBubleSvg from './svgs/speech-bubble'
import WorldMapSvg from './svgs/world-map'
import Cross from './svgs/cross'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import translate from './translate-component'

const Apps = styled.ul`
    display: grid;
    grid-template-columns: repeat(${({ amount }) => amount},1fr);
    column-gap: 5px;
    padding: 10px 3px;

    bottom: 0;
    overflow-x: scroll;
    width: 100%;

    background-color: ${({ theme }) => theme.black1};
    color: ${({ theme }) => theme.white1}
    position:fixed;
    box-shadow: 0px -2px 20px black;

    transition: transform 0.5s;
    transform: scaleY(${({ hidden }) => hidden ? 0 : 1});
    transform-origin: bottom;
`

const StyledAppLink = styled.div`
    display: flex;
    flex-direction: column;
    justify-direction: center;
    align-items: center;
    text-decoration: none;
    font-size: 2em;
`

const AppSvg = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const AppLink = translate(({ Svg, link, label, onClick, t }) => {
    const WrapperComponent = link ? (Link) : ('div')
    return (
        <WrapperComponent
            onClick={onClick}
            to={link}
        >
            <StyledAppLink>
                <AppSvg>
                    <Svg width='100px' height='100px' />
                </AppSvg>
                {label && t(`navigator.${label}`)}
            </StyledAppLink>
        </WrapperComponent>
    )
})

const apps = [
    { label: 'map', Svg: WorldMapSvg, link: '/map' },
    { label: 'messenger', Svg: SpeechBubleSvg, link: '/messenger' },
    { label: 'couterie', Svg: GroupSvg, link: '/couterie' },
    { label: 'news', Svg: NewspaperSvg, link: '/news' },
    { label: 'status', Svg: PersonSvg, link: '/status' },
    { label: 'bonds', Svg: RelationshipsSvg, link: '/relationships' },
]

const Navigator = ({ hidden, onClick, onCloseApps }) => {
    return (
        <Apps amount={apps.length + 1} hidden={hidden}>
            {apps.map(({ label, Svg, link }) => (
                <AppLink
                    key={label}
                    link={link}
                    label={label}
                    Svg={Svg}
                    onClick={onClick}
                />
            ))}
            <AppLink
                Svg={Cross}
                onClick={onCloseApps}
            />
        </Apps>
    )
}

export default Navigator