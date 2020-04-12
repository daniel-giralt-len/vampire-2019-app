import React, { useState, useEffect } from 'react'
import translate from '../translate-component'
import styled from 'styled-components'
import API from '../api'

const dateToInputValue = date => {
  try{
    return date.toISOString().split('T')[0]
  }catch(e){
    return '0000-00-00'
  }
}

const SmallTimeInput = styled.input`
  width: 2em;
  text-align: right;
`

const DateInput = styled.input``

const SaveButton = styled.button`
  margin-left: 0.5em;
`

const DateSetter = ({ t }) => {
  const [jsDate, setJsDate] = useState(new Date(0))

  const saveDate = () => {
    API.setDate(jsDate.getTime()/1000)
  }

  useEffect(() => {
    API.getEpoch()
      .then(({epoch}) => {
        const date = new Date(epoch*1000)
        setJsDate(date)
      })
  }, [])


  const changeISODate = event => {
    const newDate = new Date(event.target.value)
    newDate.setHours(jsDate.getHours())
    newDate.setMinutes(jsDate.getMinutes())
    setJsDate(newDate)
  }

  return (
    <React.Fragment>
      <DateInput 
        type='date' 
        value={dateToInputValue(jsDate)}
        onChange={changeISODate}
      />
      <SmallTimeInput 
        type='number' 
        name={t('admin.date.hours.label')}
        value={jsDate.getHours()}
        onChange={event => {
          const newDate = new Date(jsDate.getTime())
          newDate.setHours(event.target.value)
          setJsDate(newDate)
        }}
      />
      :
      <SmallTimeInput 
        type='number' 
        name={t('admin.date.minutes.label')}
        value={jsDate.getMinutes()}
        onChange={event => {
          const newDate = new Date(jsDate.getTime())
          newDate.setMinutes(event.target.value)
          setJsDate(newDate)
        }}
      />
      <SaveButton onClick={saveDate} >
        {t('admin.date.save')}
      </SaveButton>
    </React.Fragment>
  )
}

export default translate(DateSetter)