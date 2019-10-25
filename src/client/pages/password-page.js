import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { palette } from '../colors'
import API from '../api'

const StyledPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  background: ${palette.black1};
  color: ${palette.white1};
`

const Keyboard = styled.main`
  display: grid;
  grid-template-columns: repeat(3, 9em);
  grid-template-rows: repeat(${({ nKeys }) => Math.ceil(nKeys / 3)}, 9em);
  row-gap: 5vmin;
  column-gap: 5vmin;
`

const Key = styled.button`
  font-size: 6em;
  border: 1px solid ${palette.white1};
`

const CurrentInput = styled.div`
  font-size: 6em;
  margin-bottom: 2vh;
`

const keys = 'ABCDEFJHI'.split('')

const PasswordPage = ({ onPasswordVerification }) => {
  const [input, setInput] = useState('')
  const passwordLength = 8

  const addKey = key => setInput(`${input}${key}`)

  useEffect(() => {
    if(input.length < passwordLength){
      return
    }
    API.verifyPassword(input)
      .then(({verified, token, tokenTTL}) => {
        setInput('')
        if(verified){
          return onPasswordVerification({token, tokenTTL})
        }
      })
  }, [input])
  return (<StyledPage>
    <CurrentInput>
      {input === '' ? '---' : input}
    </CurrentInput>
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