import React, { useState, useEffect } from 'react'
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
          <div key={type}>
            <input 
              type='radio'
              id={type}
              name='weather'
              value={type}
              onChange={event => setWeatherType(event.target.value)}
            />
            <label htmlFor={type}>
              {t(`weather.${type}`)}
            </label>
          </div>
        ))}
      </div>
      <button onClick={saveWeather} >
        {t('admin.weather.save')}
      </button>
    </React.Fragment>
  )
}

export default translate(WeatherSetter)