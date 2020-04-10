import React, { useState, useEffect } from 'react'
import translate from '../translate-component'
import API from '../api'

const DateSetter = ({ t }) => {
  const [hours, setHours] = useState(null)
  const [minutes, setMinutes] = useState(null)
  const [epoch, setEpoch] = useState(null)

  const saveDate = () => {
    const newDate = new Date(epoch)
    newDate.setHours(hours)
    newDate.setMinutes(minutes)
    API.setDate(newDate.getTime())
  }

  useEffect(() => {
    API.getEpoch()
      .then(({epoch}) => {
        const date = new Date(epoch)
        setEpoch(epoch)
        setHours(date.getHours())
        setMinutes(date.getMinutes())
      })
  }, [])

  return (
    <React.Fragment>
      <input 
        type='number' 
        name={t('admin.date.hours.label')}
        value={hours ? hours : 0}
        onChange={event => setHours(event.target.value)}
      />
      :
      <input 
        type='number' 
        name={t('admin.date.minutes.label')}
        value={minutes ? minutes : 0}
        onChange={event => setMinutes(event.target.value)}
      />
      <button onClick={saveDate} >
        {t('admin.date.save')}
      </button>
    </React.Fragment>
  )
}

export default translate(DateSetter)