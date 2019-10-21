import React, { useEffect, useState } from 'react'
import { Map, View } from 'ol'
import { fromLonLat } from 'ol/proj'
import { Circle, Fill, Style, Stroke } from 'ol/style'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import OSM from 'ol/source/OSM'
import styled from 'styled-components'
import API from '../api'

const MapTarget = styled.div`
  height: 100%;
  width: 100%;
`

const membersToFeatures = members => {
  return members.map(({ location }) => {
    console.log(fromLonLat([location.latitude, location.longitude]))
    return new Feature({
      geometry: new Point(fromLonLat([location.latitude, location.longitude]))
    })
  })
}

const MapApp = () => {
  const mapDivRef = React.createRef()
  const [mapData, setMapData] = useState([])
  const [olMap, setOlMap] = useState(null)
  useEffect(() => {
    API.getMapsData()
      .then(setMapData)
  }, [])

  useEffect(() => {
    /* TODO - handle multi rendering
      1. on mount render map
      2. on mapData received configure map:
        - put pins
        - center map somehow
      3. on update only rerender pins, no recentering
    */
   //TODO update calls to BE
    if(mapData.length === 0) return
    setOlMap(new Map({
      target: mapDivRef.current,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        new VectorLayer({
          source: new VectorSource({
            type: 'icon',
            features: membersToFeatures(mapData)
          }),
          style: new Style({
            image: new Circle({
              radius: 10,
              fill: new Fill({ color: 'red' }),
              stroke: new Stroke({
                color: 'red',
                width: 1
              })
            })
          })

        })
      ],
      view: new View({
        center: fromLonLat([2.169349, 41.387675]),
        zoom: 15
      })
    }))
  }, [mapData])


  return (<MapTarget ref={mapDivRef} />)
}

export default MapApp