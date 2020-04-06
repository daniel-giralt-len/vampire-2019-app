import fetch from 'node-fetch'

import baseURL from './url'
import playerRequests from './player-requests'
import narratorRequests from './narrator-requests'

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
    ...playerRequests,
    ...narratorRequests,
}

export default API