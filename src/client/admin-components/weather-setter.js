import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import translate from '../translate-component'
import API from '../api'

const weatherTypes = [
  'partially_cloudy',
  'cloudy',
  'rainy',
  'clear',
  'day',
  'stormy',
  'tornado'
]

const WeatherOption = styled.div`
  display: inline-block;
  margin-right: 15px;
  margin-bottom: 10px;
`

const WeatherSetter = ({ t }) => {
  const [weatherType, setWeatherType] = useState(null)

  useEffect(() => {
    API.getWeather()
      .then(({weather}) => setWeatherType(weather))
  }, [])
  
  const saveWeather = () => {
    API.setWeather(weatherType)
  }

  return (
    <React.Fragment>
      <div>
        {weatherTypes.map(type => (
          <WeatherOption key={type}>
            <input 
              type='radio'
              id={type}
              name='weather'
              value={type}
              onChange={event => setWeatherType(event.target.value)}
              checked={type === weatherType}
            />
            <label htmlFor={type}>
              {t(`weather.${type}`)}
            </label>
          </WeatherOption>
        ))}
      </div>
      <button onClick={saveWeather} >
        {t('admin.weather.save')}
      </button>
    </React.Fragment>
  )
}

export default translate(WeatherSetter)