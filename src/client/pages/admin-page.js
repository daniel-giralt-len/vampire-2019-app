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

  useEffect(() => {
    API.isAdminPasswordSet()
      .then(({ isPasswordSet }) => {
        setIsPasswordSet(isPasswordSet)
      })
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
    const checkAdminPassword = () => {
      API.checkAdminPassword(passwordInput)
        .then(({isPasswordValid}) => setIsPasswordValid(isPasswordValid))
    }

    return (<CenteringWrapper>
      <p>{t('admin.password.input.instruction')}</p>
      <input type='text'
         name='password' 
         id='password'
         onChange={event => onPasswordChange(event.target.value)}
      />
      <p>
        <button onClick={checkAdminPassword}>
          {t('admin.password.input.button')}
        </button>
      </p>
    </CenteringWrapper>)
  }

  const setAdminPassword = () => {
    API.setAdminPassword(passwordInput)
  }

  return (<CenteringWrapper>
    <p>{t('admin.password.set.instruction')}</p>
    <input type='text'
       name='password' 
       id='password'
       onChange={event => onPasswordChange(event.target.value)}
    />
    <p>
      <button onClick={setAdminPassword}>
        {t('admin.password.set.button')}
      </button>
    </p>
  </CenteringWrapper>)

}

export default translate(AdminPage)