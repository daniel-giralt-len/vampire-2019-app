import { post } from './fetch-wrappers'

const playerRequests = {
    verifyPassword: password => post('verify-password', {password}),
    verifyToken: token => post('verify-token', {token})
}

export default playerRequests