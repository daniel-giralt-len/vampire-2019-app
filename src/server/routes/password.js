import express from 'express'
import database from '../database'
import uuid from 'uuid'

const router = express.Router()

let players = database.load().players || []

const ttl = 604800 //1 week

router.post('/verify-password', (req, res) => {
  console.log('hit /verify-password')
  const input = req.body.password
  const playerIndex = players.findIndex(({password}) => password === input)
  if(playerIndex === -1 || players[playerIndex].token){
    return res.json({
      verified: false
    })
  }
  const token = uuid()
  const tokenTTL = Date.now() + ttl
  players[playerIndex].token = token
  players[playerIndex].tokenTTL = tokenTTL
  database.save('players', players)

  return res.json({
    verified: true,
    token,
    tokenTTL
  })
})

export default router