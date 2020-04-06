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
}

export default narratorRequests