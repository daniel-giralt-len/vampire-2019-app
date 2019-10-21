import React, { useEffect, useState } from 'react'
import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import styled from 'styled-components'
import API from '../api'

const MapTarget = styled.div`
  height: 100%;
  width: 100%;
`

const MapApp = () => {
  const mapDivRef = React.createRef()
  const [mapData, setMapData] = useState([])
  const [olMap, setOlMap] = useState(new Map())
  useEffect(() => {
    API.getMapsData()
      .then(setMapData)
    setOlMap(new Map({
      target: mapDivRef.current,
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: [0],
        zoom: 0
      })
    }))
  }, [])

  return (<MapTarget ref={mapDivRef} />)
}

export default MapApp