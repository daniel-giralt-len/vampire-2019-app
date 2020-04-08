import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import translate from '../translate-component'
import API from '../api'
import AdminPanel from '../admin-components/admin-panel'
import {
  saveToken,
  getToken,
  removeToken,
} from '../token'

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
  const [token, setToken] = useState(getToken())

  const evaluatePasswordSet = () => API.isAdminPasswordSet()
    .then(({ isPasswordSet }) => {
      setIsPasswordSet(isPasswordSet)
      return isPasswordSet
    })

  useEffect(() => {
    evaluatePasswordSet()
      .then(isPasswordSet => isPasswordSet && API.verifyAdminToken(token))
      .then(({ verified }) => {
        setIsPasswordValid(verified)
        if(!verified){
          removeToken()
        }
      })
  }, [])

  if(isPasswordValid === true){
    return (<AdminPanel />)
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
        .then(({isPasswordValid, token}) => {
          setIsPasswordValid(isPasswordValid)
          setToken(token)
          saveToken(token)
        })    

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
    {isSettingPasword && (<p>{t('admin.password.set.refresh')}</p>)}
  </CenteringWrapper>)

}

export default translate(AdminPage)