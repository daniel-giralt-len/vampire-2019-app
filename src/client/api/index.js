import fetch from 'node-fetch'

const baseURL = 'https://localhost:3001'

const API = {
    getCharacterData: id => {
        return fetch(`${baseURL}/player/${id}`)
            .then(res => res.json())
    },
    getCouterieData: () => {
        return fetch(`${baseURL}/couterie`)
            .then(res => res.json())
    },
    getMapsData: () => {
        return fetch(`${baseURL}/maps`)
            .then(res => res.json())
    },
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
    }
}

export default API