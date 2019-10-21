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
    }
}

export default API