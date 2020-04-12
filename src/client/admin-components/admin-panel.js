import React from 'react'
import styled from 'styled-components'
import Navigator from './navigator'
import translate from '../translate-component'
import DateSetter from '../admin-components/date-setter'
import NewsSetter from '../admin-components/news-setter'
import WeatherSetter from '../admin-components/weather-setter'

const PanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  input {
    border: 2px solid ${({ theme }) => theme.font};
    padding: 0px 3px;
  }
  textarea {
    resize: none;
    border: 2px solid black;
    padding: 0px 3px;
    height: 3em;
  }
`

const AdminPanel = ({t}) => {
  return (
      <PanelWrapper>
        <Navigator/>
        <div>
          <a name='date'/>
          <h1>{t('admin.navigator.date')}</h1>
          <DateSetter />
        </div>
        <div>
          <a name='weather'/>
          <h1>{t('admin.navigator.weather')}</h1>
          <WeatherSetter />
        </div>
        <div>
          <a name='map'/>
          <h1>{t('navigator.map')}</h1>
        </div>
        <div>
          <a name='messenger'/>
          <h1>{t('navigator.messenger')}</h1>
        </div>
        <div>
          <a name='couterie'/>
          <h1>{t('navigator.couterie')}</h1>
        </div>
        <div>
          <a name='news'/>
          <h1>{t('navigator.news')}</h1>
          <NewsSetter />
        </div>
        <div>
          <a name='sheets'/>
          <h1>{t('admin.navigator.sheets')}</h1>
        </div>
        <div>
          <a name='relationships'/>
          <h1>{t('navigator.bonds')}</h1>
        </div>
      </StyledLayout>
      </PanelWrapper>
  )
}

export default translate(AdminPanel)