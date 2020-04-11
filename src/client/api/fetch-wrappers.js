import fetch from 'node-fetch'
import baseURL from './url'

const get = (subPath) => {
  return fetch(`${baseURL}/${subPath}`)
      .then(res => res.json())
}
const post = (subPath, body) => {
  return fetch(`${baseURL}/${subPath}`, 
      { 
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
      })
      .then(res => res.json())
}

export {
  get,
  post
}