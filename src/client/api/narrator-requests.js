import fetch from 'node-fetch'

import baseURL from './url'

const narratorRequests = {
  isAdminPasswordSet: () => Promise.resolve(false)
}

export default narratorRequests