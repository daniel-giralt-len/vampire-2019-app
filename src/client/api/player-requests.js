import fetch from 'node-fetch'

import baseURL from './url'

const playerRequests = {
    verifyPassword: password => {
        return fetch(
            `${baseURL}/verify-password`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    password: password
                })
            }
        ).then(res => res.json())
    },
    verifyToken: token => {
        return fetch(
            `${baseURL}/verify-token`,
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

export default playerRequests