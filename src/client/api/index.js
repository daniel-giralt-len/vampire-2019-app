import fetch from 'node-fetch'

const baseURL = 'https://localhost:5000'

const API = {
    getCharacterData: token => {
        return fetch(`${baseURL}/character?token=${token}`)
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
    getTheme: token =>{
        return fetch(`${baseURL}/theme?token=${token}`)
            .then(res => res.json())
    },
    setTheme: ({token, theme}) => {
        return fetch(`${baseURL}/theme`, 
            { 
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({token, theme})
            })
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

export default API