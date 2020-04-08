import React, { useState, useEffect } from 'react'
import translate from '../translate-component'
import styled from 'styled-components'

const StyledLayout = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`

const AdminPanel = ({t}) => {
  return (
      <StyledLayout>
        <a href='#map'>map</a>
        <a href='#messenger'>messenger</a>
        <a href='#couterie'>couterie</a>
        <a href='#news'>news</a>
        <a href='#status'>status</a>
        <a href='#relationships'>relationships</a>
        <div><a name='map'/><h1>map</h1></div>
        <div><a name='messenger'/><h1>messenger</h1></div>
        <div><a name='couterie'/><h1>couterie</h1></div>
        <div><a name='news'/><h1>news</h1></div>
        <div><a name='status'/><h1>status</h1></div>
        <div><a name='relationships'/><h1>relationships</h1></div>
      </StyledLayout>
  )
}

export default translate(AdminPanel)