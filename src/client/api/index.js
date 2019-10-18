import fetch from 'node-fetch'

const baseURL = 'https://localhost:3001'

const API = {
    getPlayerData: id => {
        return fetch(`${baseURL}/player/${id}`)
            .then(res => res.json())
    }
}

export default API