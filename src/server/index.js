import express from 'express'
import https from 'https'
import fs from 'fs'
import cors from 'cors'

import playerData from './fixtures/status-schema.json'
import couterieData from './fixtures/couterie-schema.json'
import mapsData from './fixtures/maps-schema.json'

import password from './routes/password'
import token from './routes/token'

const app = express()
app.use(cors())
const port = 3001

var options = {
  key: fs.readFileSync(__dirname + '/selfsigned.key'),
  cert: fs.readFileSync(__dirname + '/selfsigned.crt')
}

app.get('/', (_, res) => res.send('Running'))

app.get('/player/:id', (_, res) => {
  console.log('hit /player/id')
  res.json(playerData)
})

app.get('/couterie', (_, res) => {
  console.log('hit /couterie')
  res.json(couterieData)
})

app.get('/maps', (_, res) => {
  console.log('hit /maps')
  res.json(mapsData)
})

app.use(express.json())
app.use(password)
app.use(token)

var server = https.createServer(options, app)

server.listen(port)
