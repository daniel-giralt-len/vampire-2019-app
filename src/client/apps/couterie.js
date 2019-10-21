import React, { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components'
import API from '../api'
import translate from '../translate-component'
import { SquareCounter } from '../components/stat-counters'

const StyledCouterie = styled.ul`
  display: grid;
  grid-template-rows: repeat(${({ amount }) => amount}, 1fr);
  row-gap: 2.5vh;
`

const StyledPage = styled.main`
  flex-grow: 1;
  overflow-y: scroll;

  padding: 3vh 3vw 0.5vh 3vw;
`

const StyledMember = styled.li`
  font-size: 1.4em;
  display: grid;
  grid-template-columns: 0.4fr 1.3fr 0.9fr 0.9fr;
  grid-template-rows: min-content min-content;
  grid-template-areas:
    "avatar player-name physical willpower"
    "avatar character-name physical willpower";
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

const Member = translate(({
  name,
  playerName,
  avatar: avatarUrl,
  damage,
  t
}) => {
  return (<StyledMember>
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
})

const Couterie = ({ t }) => {
  const [couterie, setCouterie] = useState([])
  useEffect(() => {
    API.getCouterieData()
      .then(setCouterie)
  }, [])
  return (
    <StyledPage>
        <StyledMember>
          <PhysicalDamage>{t('stats.damage.physical')}</PhysicalDamage>
          <WillpowerDamage>{t('stats.damage.willpower')}</WillpowerDamage>
        </StyledMember>
      <StyledCouterie amount={couterie.length}>
        {couterie.map((member, index) => (<Member key={member.id} {...member} />))}
      </StyledCouterie>
    </StyledPage>
  )
}

export default translate(Couterie)