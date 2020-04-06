import fetch from 'node-fetch'

import baseURL from './url'

const narratorRequests = {
  isAdminPasswordSet: () => {
    return fetch(`${baseURL}/admin-password-set`)
        .then(res => res.json())
  },
}

export default narratorRequests