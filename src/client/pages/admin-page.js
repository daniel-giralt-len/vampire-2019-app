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
  const [passwordSet, setPasswordSet] = useState('')

  useEffect(() => {
    API.isAdminPasswordSet()
      .then(({ isPasswordSet }) => {
        setIsPasswordSet(isPasswordSet)
      })
  }, [])

  if(isPasswordSet === null){
    return 'loading...'
  }

  if(isPasswordSet === true){
    return 'please enter your password'
  }

  const onPasswordChange = (value) => {
    setPasswordSet(value)
  }

  const setAdminPassword = () => {
    API.setAdminPassword(passwordSet)
  }

  return (<CenteringWrapper>
    <p>{t('admin.password.set.instruction')}</p>
    <input type={'text'} 
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