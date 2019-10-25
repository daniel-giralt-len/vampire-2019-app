import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { palette } from '../colors'

const StyledPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  height: 100%;
  background: ${palette.black1};
  color: ${palette.white1};
`

const Keyboard = styled.main`
  display: grid;
  grid-template-columns: repeat(3, 9em);
  grid-template-rows: repeat(${({ nKeys }) => Math.ceil(nKeys / 3)}, 9em);
  row-gap: 1vh;
  column-gap: 1vw;
`

const Key = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9em;
  text-align: center;
  border: 1px solid ${palette.white1};
`

const CurrentInput = styled.div`
  font-size: 6em;
`

const keys = 'ABCDEFJHI'.split('')

const PasswordPage = ({ onPasswordVerification }) => {
  const [input, setInput] = useState('')
  const passwordLength = 10

  const addKey = key => setInput(`${input}${key}`)

  useEffect(() => {
    if(input.length < passwordLength){
      return
    }
    /* const {verified, token} = verifyPassword(password)
    if(verified){
      return onPasswordVerification(token)
    } */
    setInput('')
  }, [input])
  return (<StyledPage>
    <CurrentInput>{input}</CurrentInput>
    <Keyboard nKeys={keys.length}>
      {keys.map(key => (
        <Key
          key={key}
          onClick={() => addKey(key)}
        >
          {key}
        </Key>)
      )}
    </Keyboard>
  </StyledPage>)
}

export default PasswordPage