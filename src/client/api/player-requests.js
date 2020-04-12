import { get, post } from './fetch-wrappers'

const playerRequests = {
    verifyPassword: password => post('verify-password', {password}),
    verifyToken: token => post('verify-token', {token}),
    getFreshNews: () => get('news/fresh'),
}

export default playerRequests