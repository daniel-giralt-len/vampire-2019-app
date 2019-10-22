import React, { useEffect, useRef, useState } from 'react'
import { Map, View } from 'ol'
import { fromLonLat } from 'ol/proj'
import { palette } from '../colors'
import { Circle, Fill, Style, Stroke } from 'ol/style'
import Icon from 'ol/style/Icon'
import Text from 'ol/style/Text'
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
  return members.map(({ location, name, avatar, danger }, index) => {
    const feature = new Feature({
      geometry: new Point(fromLonLat([location.latitude, location.longitude])),
      name: name,
      description: danger
    })
    let textColor = palette.black1
    if(danger === 'hurt') {
      textColor = palette.red1
    }
    if(danger === 'letargy'){
      textColor = palette.grey1
    }
    feature.setStyle(new Style({
      image: new Icon({
        src: avatar,
        scale: 3,
      }),
      text: new Text({
        text: name,
        offsetY: 85,
        scale: 10,
        fill: new Fill({ color: textColor }),
        stroke: new Stroke({ color: palette.white1 }),
        font: '1em "Venetian 301"' //use with react https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/font
      })
    }))
    return feature
  })
}

const MapApp = () => {
  const mapDivRef = React.createRef()
  const olMap = useRef(new Map())
  const [mapData, setMapData] = useState([])

  useEffect(() => {
    API.getMapsData()
      .then(setMapData)
    olMap.current.setTarget(mapDivRef.current)
    olMap.current.addLayer(new TileLayer({
      source: new OSM()
    }))
    olMap.current.setView(new View({
      center: fromLonLat([2.169349, 41.387675]),
      zoom: 15
    }))
  }, [])

  useEffect(() => {
    if (mapData.length === 0) return
    olMap.current.addLayer(
      new VectorLayer({
        source: new VectorSource({
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
    )
  }, [mapData])

  return (<MapTarget ref={mapDivRef} />)
}

export default MapApp