import express from 'express'
import https from 'https'
import fs from 'fs'
import cors from 'cors'

import playerData from './status-schema.json'

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

var server = https.createServer(options, app)

server.listen(port)
