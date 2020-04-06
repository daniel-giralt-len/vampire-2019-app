import React, { useState, useEffect } from 'react'
import translate from '../translate-component'
import API from '../api'
import PasswordSetter from '../components/password-setter'

const AdminPage = () => {
  const [isPasswordSet, setIsPasswordSet] = useState(null)
  
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

  return (<PasswordSetter />)

}

export default translate(AdminPage)