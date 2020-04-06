import React, { useState, useEffect } from 'react'
import translate from '../translate-component'
import API from '../api'

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

  return (<div>
    <p>{t('admin.password.set.instruction')}</p>
    <input type={'text'} 
       name='password' 
       id='password'
       onChange={event => onPasswordChange(event.target.value)}
    />
    <button onClick={setAdminPassword}>
      {t('admin.password.set.button')}
    </button>
  </div>)

}

export default translate(AdminPage)