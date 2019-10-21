import React, { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components'
import API from '../api'
import translate from '../translate-component'
import { SquareCounter } from '../components/stat-counters'
import PaddedApp from '../components/app-padding'

const SectionTitle = styled.h2`
    color: ${({ theme }) => theme.title}
    width: 100%;
    border-bottom: 3px solid ${({ theme }) => theme.title}
    text-align: center;
    padding-bottom: 3px;
    margin-top: 0;
    font-size: 3em;
    margin-bottom: 20px;
`

const StyledCouterie = styled.ul`
  margin-top: 10px;
  display: grid;
  grid-template-rows: repeat(${({ amount }) => amount}, 1fr);
  row-gap: 0.5vh;
`

const StyledMember = styled.li`
  padding: 10px;
  font-size: 1.4em;
  display: grid;
  grid-template-columns: 0.4fr 1.3fr 0.9fr 0.9fr;
  grid-template-rows: min-content min-content;
  grid-template-areas:
    "avatar player-name physical willpower"
    "avatar character-name physical willpower";
  background-color: ${({ danger, theme }) => {
    if(danger === 'hurt'){
      return theme.red1
    }
    if(danger === 'letargy'){
      return theme.grey1
    }
  }};
`

const Avatar = styled.div`
  grid-area: avatar;
  display: flex;
  align-items: center;
`

const AvatarImage = styled.img`
  width: 90%;
`

const PlayerName = styled.div`
  grid-area: player-name;
`

const CharacterName = styled.div`
  grid-area: character-name;
  font-size: 2.5em;
`

const StyledDamage = styled.div`
  text-align:center;

  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const PhysicalDamage = styled(StyledDamage)`grid-area: physical;`
const WillpowerDamage = styled(StyledDamage)`grid-area: willpower;`

const Damage = ({ superficial, aggravated }) => {
  return (
    <div>
      {
        Array(10).fill()
          .map((_, index) => {
            return (<SquareCounter
              key={index}
              full={index < aggravated}
              half={index < aggravated + superficial}
              size='1.1em'
            />)
          })
      }
    </div>
  )
}

const Member = ({
  name,
  playerName,
  avatar: avatarUrl,
  damage,
  danger,
}) => {
  return (<StyledMember danger={danger}>
    <Avatar>
      <AvatarImage src={avatarUrl} />
    </Avatar>
    <PlayerName>
      {playerName}
    </PlayerName>
    <CharacterName>
      {name}
    </CharacterName>
    <PhysicalDamage>
      <Damage
        superficial={damage.physical.superficial}
        aggravated={damage.physical.aggravated}
      />
    </PhysicalDamage>
    <WillpowerDamage>
      <Damage
        superficial={damage.willpower.superficial}
        aggravated={damage.willpower.aggravated}
      />
    </WillpowerDamage>
  </StyledMember>)
}

const Couterie = ({ t }) => {
  const [couterie, setCouterie] = useState([])
  useEffect(() => {
    API.getCouterieData()
      .then(setCouterie)
  }, [])
  return (
    <PaddedApp>
        <SectionTitle>{t('couterie.title')}</SectionTitle>
        <StyledMember>
          <PhysicalDamage>{t('stats.damage.physical')}</PhysicalDamage>
          <WillpowerDamage>{t('stats.damage.willpower')}</WillpowerDamage>
        </StyledMember>
      <StyledCouterie amount={couterie.length}>
        {couterie.map((member, index) => (<Member key={member.id} {...member} />))}
      </StyledCouterie>
    </PaddedApp>
  )
}

export default translate(Couterie)