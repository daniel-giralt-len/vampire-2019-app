import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import translate from '../translate-component'
import API from '../api'

const CenteringWrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
`

const AdminPage = ({t}) => {
  const [isPasswordSet, setIsPasswordSet] = useState(null)
  const [isPasswordValid, setIsPasswordValid] = useState(null)
  const [passwordInput, setPasswordInput] = useState('')
  const [isSettingPasword, setIsSettingPasword] = useState(false)

  const evaluatePasswordSet = () => API.isAdminPasswordSet()
    .then(({ isPasswordSet }) => setIsPasswordSet(isPasswordSet))

  useEffect(() => {
    evaluatePasswordSet()
  }, [])

  if(isPasswordValid === true){
    return 'this is the panel'
  }

  if(isPasswordSet === null){
    return 'loading...'
  }

  const onPasswordChange = (value) => {
    setPasswordInput(value)
  }

  if(isPasswordSet === true){
    const checkAdminPassword = () => 
      API.checkAdminPassword(passwordInput)
        .then(({isPasswordValid}) => setIsPasswordValid(isPasswordValid))    

    const onPasswordKeyDown = (e) => {
      if(e.key === 'Enter'){
        e.preventDefault()
        checkAdminPassword()
      }
    }

    return (<CenteringWrapper>
      <p>{t('admin.password.input.instruction')}</p>
      <input type='text'
         name='password' 
         id='password'
         onChange={event => onPasswordChange(event.target.value)}
         onKeyDown={onPasswordKeyDown}
      />
      <p>
        <button onClick={checkAdminPassword}>
          {t('admin.password.input.button')}
        </button>
      </p>
    </CenteringWrapper>)
  }

  const setAdminPassword = () => Promise.resolve(setIsSettingPasword(true))
    .then(() => API.setAdminPassword(passwordInput))
    .then(evaluatePasswordSet)
  

  const onPasswordKeyDown = (e) => {
    if(e.key === 'Enter'){
      e.preventDefault()
      setAdminPassword()
    }
  }

  return (<CenteringWrapper>
    <p>{t('admin.password.set.instruction')}</p>
    <input type='text'
       name='password' 
       id='password'
       onChange={event => onPasswordChange(event.target.value)}
       onKeyDown={onPasswordKeyDown}
    />
    <p>
      <button onClick={setAdminPassword}>
        {t('admin.password.set.button')}
      </button>
    </p>
    {isSettingPasword && (<p>{t('admin.password.input.refresh')}</p>)}
  </CenteringWrapper>)

}

export default translate(AdminPage)