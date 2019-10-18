import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import colors from '../colors'
import API from '../api'

const StyledApp = styled.main`
    flex-grow: 1;
    overflow-y: scroll;
`

const Circle = styled.div`
    display: inline-block;
    ${({ full }) => full ? `background-color: ${colors.black1};` : ''}
    ${({ size = '5px' }) => {
        return `
        width: ${size};
        height: ${size};
        border-radius: ${size};
        border: 1px solid ${colors.black1}
        `
    }}
`

const Square = styled.div`
    ${({ full }) => full ? `background-color: ${colors.black1};` : ''}
    ${({ size = '5px' }) => {
        return `
        width: ${size};
        height: ${size};
        border: 1px solid ${colors.black1}
        `
    }}
`

const Damage = ({ type }) => {
    const text = {
        none: '',
        superficial: '/',
        aggravated: 'X',
    }[type]
    return <Square>{text}</Square>
}

const StatTypeColumns = styled.div`
    display: grid;
    grid-template-columns: repeat(3,1fr);
    grid-template-areas: 
        "physical social mental";
`

const StatColumn = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    grid-area: ${({ type }) => type};
`

const SectionTitle = styled.h2`
    color: ${colors.red1}
    width: 100%;
    border-bottom: 3px solid ${colors.red1}
    text-align: center;
    padding-bottom: 3px;
    margin-bottom: 5px;
`

const StyledStat = styled.li`

`

const Stat = ({label, amount}) => {
 return (
    <StyledStat>
        <div>{label}</div>
        <div>{Array(5).fill().map((_, index) => (<Circle full={index < amount} />))}</div>
    </StyledStat>
 )
}

const StatsSection = ({stats}) => {
        console.log(stats)
    return (<StatTypeColumns>
        {Object.keys(stats).map(type => {
            return <StatColumn
                type={type}
            >
                {Object.entries(stats[type])
                    .map(([label, amount]) => (<Stat label={label} amount={amount} />))}
            </StatColumn>
        })}
    </StatTypeColumns>)
}

const StatusApp = () => {
    const [data, setData] = useState(undefined)
    useEffect(() => {
        API.getPlayerData('Clara')
            .then(setData)
    }, [])

    if (!data) return ''
    console.log(data)
    const { general, damage, stats } = data
    const { attributes, skills, disciplines } = stats
    return (<StyledApp>
        <SectionTitle>Attributes</SectionTitle>
        <StatsSection stats={attributes} />
        <SectionTitle>Skills</SectionTitle>
        <StatsSection stats={skills} />
        <SectionTitle>Disciplines</SectionTitle>
    </StyledApp>)
}

export default StatusApp