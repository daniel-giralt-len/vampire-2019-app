import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import API from '../api'
import translate from '../translate-component'

const StyledApp = styled.main`
    flex-grow: 1;
    overflow-y: scroll;
    padding: 3vh 3vw 0.5vh 3vw;
`

const SectionTitle = styled.h2`
    color: ${({theme}) => theme.title}
    width: 100%;
    border-bottom: 3px solid ${({theme}) => theme.title}
    text-align: center;
    padding-bottom: 3px;
    margin-bottom: 5px;
`

const Square = styled.div`
    display: inline-block;
    margin-right: 5px;
    ${({ full, half, theme }) => {
        if (full) {
            return `background-color: ${theme.font};`
        }
        if (half) {
            return `background: linear-gradient(to right, transparent 50%, ${theme.font} 50%);`
        }
    }}
    ${({ size = '1em', theme }) => {
        return `
        width: ${size};
        height: ${size};
        border: 1px solid ${theme.font}
        `
    }}
`

const Circle = styled(Square)`
    ${({ size = '1em' }) => `border-radius: ${size};`}
`

const Damage = ({ label, superficial, aggravated }) => {
    return (<li>
        <div>{label}</div>
        <div>
            {
                Array(10).fill()
                    .map((_, index) => {
                        return (<Square
                            key={index}
                            full={index < aggravated}
                            half={index < aggravated + superficial}
                        />)
                    })
            }
        </div>
    </li>)
}

const Columns = styled.ul`
    display: grid;
    grid-template-columns: repeat(${({ amount = 3 }) => amount},1fr);
`

const StatTypeColumns = styled(Columns)`
    grid-template-areas: 
        "physical social mental";
`

const StatColumn = styled.div`
    grid-area: ${({ type }) => type};
`

const Resource = ({ label, amount, maxAmount = 10, CounterComponent = Square }) => {
    return (
        <li>
            <div>{label}</div>
            <div>{Array(maxAmount).fill().map((_, index) => (<CounterComponent key={index} full={index < amount} />))}</div>
        </li>
    )
}

const Stat = ({ label, amount }) => (
    <Resource label={label}
        amount={amount}
        maxAmount={5}
        CounterComponent={Circle}
    />
)

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

const StatusApp = ({ t }) => {
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
                    .map(([label, value]) => (<li key={label}>{t(`stats.${label}`)}: {value}</li>))
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