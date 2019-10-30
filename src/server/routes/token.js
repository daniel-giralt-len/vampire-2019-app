import express from 'express'
import database from '../database'
const router = express.Router()


router.post('/verify-token', (req, res) => {
  console.log('hit /verify-token')
  let players = database.load().players || []
  const input = req.body.token
  const playerIndex = players.findIndex(({token}) => token === input)
  if(playerIndex === -1 || players[playerIndex].token){
    return res.json({
      verified: false
    })
  }
  return res.json({
    verified: true,
  })
})

export default router