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

  button {
    outline: 0;
    border: 3px solid ${({ theme }) => theme.font};
    :hover {
      background-color: ${({ theme }) => theme.grey1};
    }
    :active {
      background-color: ${({ theme }) => theme.font};
      color:${({ theme }) => theme.background};
    }
  }
`

const AdminPanel = ({t}) => {
  return (
      <PanelWrapper>
        <Navigator/>
        <section>
          <a name='date'/>
          <h1>{t('admin.navigator.date')}</h1>
          <DateSetter />
        </section>
        <section>
          <a name='weather'/>
          <h1>{t('admin.navigator.weather')}</h1>
          <WeatherSetter />
        </section>
        <section>
          <a name='map'/>
          <h1>{t('navigator.map')}</h1>
        </section>
        <section>
          <a name='messenger'/>
          <h1>{t('navigator.messenger')}</h1>
        </section>
        <section>
          <a name='couterie'/>
          <h1>{t('navigator.couterie')}</h1>
        </section>
        <section>
          <a name='news'/>
          <h1>{t('navigator.news')}</h1>
          <NewsSetter />
        </section>
        <section>
          <a name='sheets'/>
          <h1>{t('admin.navigator.sheets')}</h1>
        </section>
        <section>
          <a name='relationships'/>
          <h1>{t('navigator.bonds')}</h1>
        </section>
      </PanelWrapper>
  )
}

export default translate(AdminPanel)