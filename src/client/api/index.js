import { get, post } from './fetch-wrappers'

import playerRequests from './player-requests'
import narratorRequests from './narrator-requests'

const API = {
    getCharacterData: token => get(`character?token=${token}`),
    getCouterieData: () => get('couterie'),
    getMapsData: () => get('maps'),
    getTheme: token => get(`theme?token=${token}`),
    setTheme: ({token, theme}) => post('theme', {token, theme}),
    getEpoch: () => get('date'),
    getWeather: () => get('weather'),
    getNews: () => get('news'),
    ...playerRequests,
    ...narratorRequests,
}

export default API