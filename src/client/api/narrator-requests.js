import fetch from 'node-fetch'

import baseURL from './url'

const narratorRequests = {
  isAdminPasswordSet: () => {
    return fetch(`${baseURL}/admin-password-set`)
        .then(res => res.json())
  },
  setAdminPassword: (password) => {
    return fetch(`${baseURL}/admin-password-set`, 
        { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({password})
        })
        .then(res => res.json())
  },
  checkAdminPassword: password => {
    return fetch(
        `${baseURL}/admin/password`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({password})
        }
    ).then(res => res.json())
  },
  verifyAdminToken: token => {
    return fetch(
        `${baseURL}/admin/verify-token`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: token
            })
        }
    ).then(res => res.json())
  }
}

export default narratorRequests