import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import colors from '../colors'
import API from '../api'

const StyledApp = styled.main`
    flex-grow: 1;
    overflow-y: scroll;
`

const SectionTitle = styled.h2`
    color: ${colors.red1}
    width: 100%;
    border-bottom: 3px solid ${colors.red1}
    text-align: center;
    padding-bottom: 3px;
    margin-bottom: 5px;
`

const Square = styled.div`
    font-size: 4px;
    text-align: center;
    display: inline-block;
    ${({ full }) => full ? `background-color: ${colors.black1};` : ''}
    ${({ size = '5px' }) => {
        return `
        width: ${size};
        height: ${size};
        border: 1px solid ${colors.black1}
        `
    }}
`

const Circle = styled(Square)`
    ${({ size = '5px' }) => `border-radius: ${size};`}
`

const Damage = ({ label, superficial, aggravated }) => {
    return (<StyledResource>
        <div>{label}</div>
        <div>{
            Array(10)
                .fill()
                .map((_, index) => {
                    let text = ' '
                    if(index < aggravated){
                        text = 'X'
                    }else if(index < aggravated + superficial){
                        text = '/'
                    }
                    return (<Square key={index}>{text}</Square>)
                })
            }
        </div>
    </StyledResource>)
}

const Columns = styled.ul`
    display: grid;
    grid-template-columns: repeat(${({ amount = 3 }) => amount},1fr);
    list-style: none;
`

const StatTypeColumns = styled(Columns)`
    grid-template-areas: 
        "physical social mental";
`

const StatColumn = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    grid-area: ${({ type }) => type};
`

const StyledResource = styled.div`
    display: flex;
    justify-content: space-between;
`

const Resource = ({ label, amount, maxAmount = 10 }) => {
    return (
        <StyledResource>
            <div>{label}</div>
            <div>{Array(maxAmount).fill().map((_, index) => (<Square key={index} full={index < amount} />))}</div>
        </StyledResource>
    )
}

const StyledStat = styled.li``

const Stat = ({ label, amount }) => {
    return (
        <StyledStat>
            <div>{label}</div>
            <div>{Array(5).fill().map((_, index) => (<Circle key={index} full={index < amount} />))}</div>
        </StyledStat>
    )
}

const StatsSection = ({ stats }) => {
    return (<StatTypeColumns>
        {Object.keys(stats).map(type => {
            return <StatColumn
                key={type}
                type={type}
            >
                {Object.entries(stats[type])
                    .map(([label, amount]) => (<Stat label={label} key={label} amount={amount} />))}
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
    const { general, anxiety, humanity, damage, stats } = data
    const { attributes, skills, disciplines } = stats
    return (<StyledApp>
        <Columns>
            {
                Object.entries(general)
                    .map(([label, value]) => (<li key={label}>{label}: {value}</li>))
                }
        </Columns>
        <SectionTitle>Resources</SectionTitle>
        <Columns amount={2}>
            <Resource label='anxiety' amount={anxiety} maxAmount={5} />
            <Resource label='humanity' amount={humanity} />
            {
                Object.entries(damage)
                    .map(([label, { superficial, aggravated }]) => (
                        <Damage
                            key={label}
                            aggravated={aggravated}
                            label={label}
                            superficial={superficial}
                        />
                    ))
            }
        </Columns>
        <SectionTitle>Disciplines</SectionTitle>
        <Columns>
            {
                Object.entries(disciplines)
                    .map(([label, amount]) => (<Stat key={label} label={label} amount={amount} />))
            }
        </Columns>
        <SectionTitle>Attributes</SectionTitle>
        <StatsSection stats={attributes} />
        <SectionTitle>Skills</SectionTitle>
        <StatsSection stats={skills} />
    </StyledApp>)
}

export default StatusApp