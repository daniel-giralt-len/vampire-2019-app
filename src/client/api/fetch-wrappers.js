import fetch from 'node-fetch'
import baseURL from './url'

const get = (subPath) => {
  return fetch(`${baseURL}/${subPath}`)
      .then(res => res.json())
}
const post = (subPath, body) => bodyRequest(subPath, body, 'POST')
const put = (subPath, body) => bodyRequest(subPath, body, 'PUT')

const bodyRequest = (subPath, body, method) => {
  return fetch(`${baseURL}/${subPath}`, 
      { 
          method, 
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
      })
      .then(res => res.json())
}

export {
  get,
  post,
  put
}