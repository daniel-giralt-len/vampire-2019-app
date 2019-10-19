import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import colors from '../colors'
import API from '../api'
import translate from '../translate-component'

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

const StatsSection = translate(({ stats, t, type: sectionType }) => {
    return (<StatTypeColumns>
        {Object.keys(stats).map(type => {
            return <StatColumn
                key={type}
                type={type}
            >
                {Object.entries(stats[type])
                    .map(([label, amount]) => (<Stat label={t(`stats.${sectionType}.${label}`)} key={label} amount={amount} />))}
            </StatColumn>
        })}
    </StatTypeColumns>)
})

const StatusApp = ({t}) => {
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
        <SectionTitle>{t('stats.resources')}</SectionTitle>
        <Columns amount={2}>
            <Resource label={t('stats.resource.anxiety')} amount={anxiety} maxAmount={5} />
            <Resource label={t('stats.resource.humanity')} amount={humanity} />
            {
                Object.entries(damage)
                    .map(([label, { superficial, aggravated }]) => (
                        <Damage
                            key={label}
                            aggravated={aggravated}
                            label={t(`stats.damage.${label}`)}
                            superficial={superficial}
                        />
                    ))
            }
        </Columns>
        <SectionTitle>{t('stats.disciplines')}</SectionTitle>
        <Columns>
            {
                Object.entries(disciplines)
                    .map(([label, amount]) => (<Stat key={label} label={t(`stats.disciplines.${label}`)} amount={amount} />))
            }
        </Columns>
        <SectionTitle>{t('stats.attributes')}</SectionTitle>
        <StatsSection type='attributes' stats={attributes} />
        <SectionTitle>{(t('stats.skills'))}</SectionTitle>
        <StatsSection type='skills' stats={skills} />
    </StyledApp>)
}

export default translate(StatusApp)