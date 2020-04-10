import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import API from '../api'

const DateSetter = ({ hidden, onClick, onCloseApps }) => {
  const [hours, setHours] = useState(null)
  const [minutes, setMinutes] = useState(null)

  useEffect(() => {
    API.getEpoch()
      .then(({epoch}) => {
        const date = new Date(epoch)
        setHours(date.getHours())
        setMinutes(date.getMinutes())
      })
  }, [])

  return (
    <div>
      <input 
        type='number' 
        name='hours'
        value={hours ? hours : 0}
        onChange={event => setHours(event.target.value)}
      />
      :
      <input 
        type='number' 
        name='minutes'
        value={minutes ? minutes : 0}
        onChange={event => setMinutes(event.target.value)}
      />
    </div>
  )
}

export default DateSetter