import React from 'react'
import styled from 'styled-components'
import Navigator from './navigator'
import translate from '../translate-component'
import DateSetter from '../admin-components/date-setter'

const StyledLayout = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`

const AdminPanel = ({t}) => {
  return (
      <StyledLayout>
        <Navigator/>
        <div>
          <a name='date'/>
          <h1>{t('navigator.date')}</h1>
          <DateSetter />
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
        </div>
        <div>
          <a name='status'/>
          <h1>{t('navigator.status')}</h1>
        </div>
        <div>
          <a name='relationships'/>
          <h1>{t('navigator.bonds')}</h1>
        </div>
      </StyledLayout>
  )
}

export default translate(AdminPanel)